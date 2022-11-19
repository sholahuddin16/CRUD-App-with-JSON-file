import express from "express";
import bodyParser from "body-parser";
import routes from "./Routes/Route.js";
import fs from "fs";

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.use('/', routes)

//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 