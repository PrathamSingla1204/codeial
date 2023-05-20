const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');


app.use(express.static('./assests'));
//extract styles and scripts from pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
//use express router
app.use('/',require('./routes')); 

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
if(err){
    console.log(`Error : ${err}`)
    return;
    }
    console.log(`server is running on ${port}`);
});