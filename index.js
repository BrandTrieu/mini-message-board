const express = require("express");
const app = express();
const path = require("node:path");

// This sets the path for templates to the views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// This is a list of links to be passed to the view
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

// This is a list of users to be passed to the view
const users = ["Rose", "Cake", "Biff"];

// This will render the index.ejs file in the views folder
app.get("/", (req, res) => {
  res.render("index", { links: links, users: users });
});

// This sets the path for static assets like CSS, JS, and images
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


/* ALL ROUTER STUFF, COMMENTED OUT FOR VIEWS TO WORK
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});

// not the right file path, so you will get an error
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/contact-me.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/html/404.html"));
});
*/


const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});