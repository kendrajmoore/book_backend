const express = require("express");

const router = express.Router();

const Book = require("../model/Book");

const User = require("../model/User");



// //ROOT ROUTE - INDEX
router.get("/books", (req, res) => {
  Book.find()
    // Provide a function for the Promise to call when it resolves- when it finished whatever it was doing.
    .then(books => {
      res.render("books/index.hbs", { books, currentUser: req.user });
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
    let author = req.body.author;
    let recording = req.body.recording;
    let user = req.user;
    let pageOne = req.body.pageOne; 
    let pageTwo = req.body.pageTwo;  
    let pageThree = req.body.pageThree;
    let pageFour = req.body.pageFour; 
    let pageFive = req.body.pageFive; 
    let pageSix = req.body.pageSix;  
    let pageSeven = req.body.pageSeven;  
    let pageEight = req.body.pageEight;
    let pageNine = req.body.pageNine; 
    let pageTen = req.body.pageTen;
    let imageOne = req.body.imageOne; 
    let imageTwo = req.body.imageTwo;  
    let imageThree = req.body.imageThree;
    let imageFour = req.body.imageFour; 
    let imageFive = req.body.imageFive; 
    let imageSix = req.body.imageSix;  
    let imageSeven = req.body.imageSeven;  
    let imageEight = req.body.imageEight;
    let imageNine = req.body.imageNine; 
    let imageTen = req.body.imageTen;
  
    let book = new Book({ name: name, category: category, photos: photos, recording: recording, author: author, pageOne: pageOne, 
      pageTwo: pageTwo, pageThree: pageThree, pageFour: pageFour, pageFive: pageFive, pageSix: pageSix,
      pageSeven: pageSeven, pageEight: pageEight, pageNine: pageNine, pageTen: pageTen, imageTen: imageTen, imageNine: imageNine, 
      imageEight: imageEight, imageSeven: imageSeven, imageSix: imageSix, imageFive: imageFive,  imageFour: imageFour, imageThree: imageThree, imageTwo: imageTwo,
      imageOne: imageOne, user: user.id });
    book.save()
    .then(function (savedBook) {
      res.redirect('/books/' + savedBook.id);
    });
  });
  

//NEW
router.get("/books/new", (req, res) => {
  const currentUser = req.user;
  res.render("books/new.hbs", { currentUser: req.user });
});


// SHOW
router.get("/books/:id", (req, res) => {
  // const currentUser = req.user;
  // if (currentUser === null) {
  //     res.redirect("/users/login");
  // }
  Book.findById(req.params.id)
    .then(book => {
      res.render("books/show.hbs", {book, currentUser: req.user });
    })
    .catch(err => {
      console.log(err.message);
    });
});

// EDIT
router.get("/books/:id/edit", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        res.redirect("/users/login");
    }
    Book.findById(req.params.id, function(err, book) {
    res.render("books/edit.hbs", { currentUser: req.user });
  });
});
//
//UPDATE
router.put("/books/:id", (req, res) => {
    if (currentUser === null) {
        res.redirect("/users/login");
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
        res.redirect("/users/login");
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