const express = require("express");
const router = express.Router();
const z = require("zod");
const { Admin } = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.get("/", (req, res) => {
  return res.json({
    message: "Hello from website",
  });
});

const adminBodyParse = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

router.post("/signup", async (req, res) => {
  const reqBody = adminBodyParse.safeParse(req.body);
  if (!reqBody.success) {
    return res.status(411).json({
      message: "please enter a valid details",
    });
  }
  const adminExist = await Admin.findOne({
    email: req.body.email,
  });
  if (adminExist) {
    return res.json({
      message: "Admin already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  const admin = await Admin.create({
    email: req.body.email,
    password: hashedPassword,
  });

  const adminId = admin._id;
  try {
    const token = jwt.sign({ adminId }, JWT_SECRET);
    res.cookie("authCookie", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "Strict",
    });
    return res
      .status(200)
      .json({
        message: "user created successfully",
        token: token,
        userId: req.body.email,
      })
      
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "error  in generating token",
    });
  }
});

const adminSigninBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signin", async (req, res) => {
  console.log(req.body)
  const reqBody = adminSigninBody.safeParse(req.body);
  if (!reqBody.success) {
    return res.json({
      message: "enter a valid credentials",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const admin = await Admin.findOne({
    email: req.body.email,
  });
  console.log("admin long in", admin);
  if (!admin) {
    return res.json({
      message: "user does not exist",
    });
  }
  const passCheck = await bcrypt.compare(req.body.password, admin.password);
  console.log("passcheckkkkkkkk",passCheck)
  if (passCheck) {
    try {
      const adminId = req.body.email;
      const token = jwt.sign(
        {
          adminId,
        },
        JWT_SECRET
      );
      console.log("tokennnn",token)
      res.cookie("authCookie", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: "Strict",
      });
      return res.json({
        message: "user is found",
        token: token,
        userId: adminId,
      })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "error  in generating token",
        });
      }
  }
});

module.exports = router;
