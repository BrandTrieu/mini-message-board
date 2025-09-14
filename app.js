const express = require("express");
const app = express();
const path = require("node:path");
const db = require("./db/queries");

// This sets the path for templates to the views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// This sets the path for static assets like CSS, JS, and images
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//// This allows Express to parse incoming form data into req.body
app.use(express.urlencoded({ extended: true }));

/*
const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    { 
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
*/



// This will render the index.ejs file in the views folder
app.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const messageText = req.body.text;
  const messageUser = req.body.user;
  // the Date object is in the correct format for PostgreSQL
  db.insertMessage(messageUser, messageText, new Date());
  res.redirect("/"); // Sends the user back to the main page
});

// If none of the routes above match, this route will be used and the URL will be a parameter
// When the Open button is clicked in the index view (which will have access to all the messages), it will send the user to the URL with the message sender's name
// That will trigger this route, which renders the Open template
// It knows which message to display by reading the message sender's name in the URL parameter and matching it to one of the messages
app.get("/:openMessage", async (req, res) => {
  const message = await db.getOneMessage(req.params.openMessage);
  res.render("open", { message: message[0] });
});


module.exports = app;