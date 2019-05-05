const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
  } catch (e) {
      res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
  } catch (e) {
      res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()

      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})


module.exports = router



// router.get("/users/new", (req, res) => {
//     res.render("users/new");
// });

// router.post("/users/new", (req, res, next) => {
//     // Create User and JWT
//     const user = new User(req.body);
//     user.save().then(user => {
//         const token = jwt.sign(
//             {
//                 _id: user._id
//             },
//             process.env.SECRET,

//             {
//                 expiresIn: "60 days"
//             }
//         );
//         res.cookie("nToken", token, {
//             maxAge: 900000,
//             httpOnly: true
//         });
//         res.redirect(`/users/${user._id}/account`);
//     });
// });

// // LOGIN FORM
// router.get("/users/login", (req, res) => {
//     res.render("users/login");
// });

// // LOGIN
// router.post("/users/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     // Find this user name
//     User.findOne({ username }, "username password")
//         .then(user => {
//             if (!user) {
//                 // User not found
//                 return res.status(401).send({ message: "Wrong try again" });
//             }
//             // Check the password
//             user.comparePassword(password, (err, isMatch) => {
//                 if (!isMatch) {
//                     // Password does not match
//                     return res.status(401).send({ message: "Wrong try again" });
//                 }
//                 // Create a token
//                 const token = jwt.sign(
//                     { _id: user._id, username: user.username },
//                     process.env.SECRET,
//                     { expiresIn: "60 days" }
//                 );
//                 // Set a cookie and redirect to root
//                 res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
//                 res.redirect(`/users/${user._id}/account`);
//             });
//         })
//         .catch(err => {
//             res.status(400).send(error.message);
//             console.log(err);
//         });
// });
// //Create user account
// router.get('/users/:id/account', (req,res) => {
//     User.findById(req.params.id)
//       .then(user => {
//         res.render("users/show.hbs", { user, currentUser: req.user });
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
// })

// // // EDIT
// router.get("/users/:id/edit", (req, res) => {
//   User.findById(req.params.id, function(err, user) {
//     res.render("users/edit.hbs", { user, currentUser: req.user });
//   });
// });
// //
// // //UPDATE
// router.put("/users/:id", (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(user => {
//       res.redirect(`/users/${user._id}/account`); // Redirect to restaurants/:id
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });
// //
// router.delete("/users/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//     .then(user => {
//       res.clearCookie("nToken");
//       res.redirect("/");
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });

// router.get("/users/logout", (req, res) => {
//     res.clearCookie("nToken");
//     res.redirect("/");
// });

// module.exports = router;