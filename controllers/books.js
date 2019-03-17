const express = require("express");

const router = express.Router();

const Book = require("../model/Book");

const User = require("../model/User");



// //ROOT ROUTE - INDEX
router.get("/books", (req, res) => {
  Book.find()
    // Provide a function for the Promise to call when it resolves- when it finished whatever it was doing.
    .then(books => {
      res.render("books/index.hbs", { books });
    })
    // Provide a function for the promise to call if it is rejected. A Promise is rejected if it fails.
    .catch(err => {
      console.log(err);
    });
});


//CREATE
router.post('/books', (req, res) => {
    let name = req.body.name;
    let category = req.body.category;
    let photos = req.body.photos;
    let recording = req.body.recording;
    let user = req.user;
  
    let book = new Book({ name: name, category: category, photos: photos, recording: recording, user: user.id });
    book.save()
    .then(function (savedBook) {
      res.redirect('/books/' + savedBook.id);
    });
  });
  

//NEW
router.get("/books/new", (req, res) => {
  res.render("books/new.hbs");
});


// SHOW
router.get("/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.render("books/show.hbs", { book });
    })
    .catch(err => {
      console.log(err.message);
    });
});

// EDIT
router.get("/books/:id/edit", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        res.redirect("/user/login");
    }
    Book.findById(req.params.id, function(err, book) {
    res.render("books/edit.hbs", { book });
  });
});
//
//UPDATE
router.put("/restaurants/:id", (req, res) => {
    if (currentUser === null) {
        res.redirect("/user/login");
    }
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => {
      res.redirect(`/books/${book._id}`); // Redirect to restaurants/:id
    })
    .catch(err => {
      console.log(err.message);
    });
});

// DELETE
router.delete("/books/:id", function(req, res) {
    if (currentUser === null) {
        res.redirect("/user/login");
    } 
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      res.redirect("/books");
    })
    .catch(err => {
      console.log(err.message);
    });
});



module.exports = router;