const express=require("express");
const { getBlogData, getBlogSearch } = require("./controller");
const Router=express.Router();

Router.route("/blog-stats").get(getBlogData);
Router.route("/blog-search").get(getBlogSearch);

module.exports=Router;