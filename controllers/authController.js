const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .json({ message: `Username and password is required.` });
  }
  const foundUser = usersDB.users.find(
    (person) => person.username === username
  );
  if (!foundUser) {
    return response.sendStatus(401); // Unauthorized
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    response.json({ success: `User ${username} is logged!` });
  } else {
    return response.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
