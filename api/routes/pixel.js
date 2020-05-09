var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    // res.send("API is working properly");

    var arr = ["http://via.placeholder.com/600x500/","http://via.placeholder.com/100x100/","http://via.placeholder.com/300x500/",
    "http://via.placeholder.com/400x400/","http://via.placeholder.com/500x700/","http://via.placeholder.com/600x400/",
    "http://via.placeholder.com/300x300/","http://via.placeholder.com/200x200/","http://via.placeholder.com/200x400/"]; 
    res.send(arr[Math.floor(Math.random() * arr.length)]);
});

module.exports = router;