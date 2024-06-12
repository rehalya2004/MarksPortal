const express = require("express")
const router = require("./Routes/routes")
const markRoutes = require("./Routes/markRoutes")
const jwt = require("jsonwebtoken")
require("./Models/Db")
const app = express()
const loginModel = require("./Models/UserSchema")


app.use(express.json());
app.use("/", router);
app.use("/", markRoutes);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);


  jwt.verify(token, "MRKWWRTFLAFWWTFTGINL", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

app.get('/posts', authenticateToken, (req, res) => {
  console.log(req.user.email);
  res.json({ "email": req.user.email, "password" : req.user.password ,"role": req.user.role });
})


app.get("/users", async (req, res) => {
  try {
    const allUser = await loginModel.find({});
    res.send({ status: "ok", data: allUser })
  } catch (error) {
    console.log(error)
  }
})


app.listen("8000", (err) => {
  if (err) console.log(err)
  else console.log("Server has started in Port 8000")
})


