const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
    // Filter the users array for any user with the same username
    let validusers = users.filter((user) => {
        return (user.username === username);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60});

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const userName = req.session.authorization['username'];
  const book = books[req.params.isbn];
  const newReview = req.body.review;
  if (!book) {
    res.send("Cannot find book by isbn");
  } else if (!newReview) {
    res.send("No review submitted");
  } else {
    books[req.params.isbn]["reviews"][userName] = newReview;
  }
  res.send("Thank you. Your review has now been added. Current reviews for this book are: " + JSON.stringify(books[req.params.isbn]["reviews"]));
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const userName = req.session.authorization['username'];
    delete books[req.params.isbn]["reviews"][userName];
    res.send("Your review has been deleted");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
