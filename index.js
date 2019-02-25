// Find express folder in my node_modules folder and
import express from "express";
// express = require('express')
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello world");

const handleProfile = (req, res) => res.send("You are on my profile");

// respond with "hello world" when a GET request is made to the homepage
app.get("/", handleHome);

app.get("/profile", handleProfile);

// set port
app.listen(PORT, handleListening);
