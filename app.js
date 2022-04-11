const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { post } = require("./routes/posts");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
let port = process.env.PORT || 3000;

// middleware
//app.use('/posts', ()=> {
//    console.log("This is a middleware running");
//});
app.use(cors());
app.use(bodyParser.json());


// import routes
const postsRoutes = require('./routes/posts');

// everytime you use /posts, use postsRoutes which is in routes folder
app.use('/posts', postsRoutes)

// Routes
app.get('/', (req, res)=>{
    res.send("We are on home");
});

// connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true}, () =>
    console.log('connected to DB')
);

// listen to the server
//app.listen(3000);
app.listen(port, ()=> {
    console.log('My app is listening on port http://localhost:'+port);
});