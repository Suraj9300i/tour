const express = require("express");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Suraj Kumar Gupta",
    email: "suraj@gmail.com",
    password: "12345678",
  },
  {
    id: "u2",
    name: "Light Yagami",
    email: "light@gmail.com",
    password: "12345678",
  },
  {
    id: "u3",
    name: "Harry",
    email: "harry@gmail.com",
    password: "12345678",
  },
];

function retrieveAllUser(req, res) {
  res.status(200).json({
    status: "success",
    data: DUMMY_USERS,
  });
}

function createNewUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(501).json({
      status: "fail",
      message: "all fields are required",
    });
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    res.status(502).json({
      status: "fail",
      message: "Invalid email",
    });
  }

  const newUser = {
    id: "u" + (DUMMY_USERS.length + 1),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);
  res.status(200).json({
    status: "success",
    user: newUser,
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  const user = DUMMY_USERS.find((item) => {
    if (item.email === email && item.password === password) return true;
  });
  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "invalid credentials",
    });
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
}

const router = express.Router();

router.route("/").get(retrieveAllUser);

router.route("/signup").post(createNewUser);

router.route("/login").post(loginUser);

module.exports = router;
