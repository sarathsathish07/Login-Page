const express = require("express");
const router = express.Router();
const nocache = require("nocache");
router.use(nocache());

//Credentials
const credential = {
  email: "admin@gmail.com",
  password: "12345",
};

// Session Handling
router.get("/", (req, res) => {
  if (!req.session.user) {
    res.render("base");
  } else {
    res.redirect("/dashboard");
  }
});

router.get("/user", (req, res) => {
  const name = req.query.name;
  res.send(`hi ${name}`);
});
router.get('/users/:id',(req,res)=>{
  const users = req.params.id
  res.send(`id: ${users}`)
})

//  route for Login
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/dashboard");
  } else {
    res.render("base", { error: "Invalid Email or Password" });
  }
});

//route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { title: "dashboard", user: req.session.user });
  } else {
    res.redirect("/");
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", { logout: "Logout successfully...!" });
    }
  });
});

module.exports = router;
