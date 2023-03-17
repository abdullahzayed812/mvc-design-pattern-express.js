const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "Username and password is required." });
  }
  const duplicate = usersDB.users.find(
    (person) => person.username === username
  );
  if (duplicate) return response.sendStatus(409); // conflict
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, newUser]);
    console.log(usersDB.users);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    response.status(201).json({ success: `User ${username} is created!` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getAllUsers = (request, response) => {
  response.json(usersDB.users);
};

module.exports = { handleNewUser, getAllUsers };
