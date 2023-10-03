const express=require("express");
const { getBlogData, blogSearch } = require("./controller");
const Router=express.Router();

Router.route("/blog-stats").get(getBlogData);
Router.route("/blog-search").get(blogSearch);

module.exports=Router;