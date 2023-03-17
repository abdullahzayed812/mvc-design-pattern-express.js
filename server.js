const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// it parses incoming request with urlencoded payloads and based on body parser
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware for server static files
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (request, response) => {
  response.statusCode = 404;
  if (request.accepts("html")) {
    response.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (request.accepts("json")) {
    response.json({ error: "404 Not Found" });
  } else {
    response.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}`));
