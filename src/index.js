const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const log = console.log;
const PORT = 8081;
const app = express();

// Configuring our data parsing
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

let items = [576, 1964, 15764];

function getOtp() {
  let item = items[Math.floor(Math.random() * items.length)];
  return item;
}

const verifyOtp = (otp) => {
  return items.includes(parseInt(otp, 10));
};

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Node otp Server" });
});

app.get("/send", (req, res) => {
  res.status(200).json({ number: getOtp() });
});

app.post("/verify", (req, res) => {
  const { number } = req.body;
  console.log(number);
  if (verifyOtp(number)) {
    res.status(200).json({ msg: "Verified Successfully" });
  } else {
    console.log("I'm Here");
    res.status(200).json({ msg: "The otp entered is incorrect" });
  }
});

app.listen(PORT, () => log("Server is starting on PORT,", 8081));
