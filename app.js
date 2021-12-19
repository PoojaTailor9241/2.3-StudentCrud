const express = require("express");
const app = express();
const StudRouter = require("./routes/StudRouter");
const cookieparser = require('cookie-parser');
const { verify }= require('./libs/jwt');

app.set('view engine','pug');
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.use('/student',StudRouter);

app.listen(7575,() =>{
    console.log("listening at port 7575...");
})