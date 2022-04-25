// const express = require('express');
import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import {router} from "./routes/todos"
import path from "path";


const PORT = process.env.PORT || 3000;
const app: Application = express();
const publicPath = path.join(__dirname, './views');


const hbs = create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use('/', express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(router);

async function start() {
  try {
    const userConf = {
      user: "user",
      password: "qwerty2022",
    };
    await mongoose.connect(
      `mongodb+srv://${userConf.user}:${userConf.password}@cluster0.ydekr.mongodb.net/todos`
    );

    app.listen(PORT, (): void => {
      console.log("Server has been started...");
    });

  } catch (error) {
    console.log(error);
  }
}
start();
