const ErrorHandler = require("./Utils/errorhandler");
const _ = require('lodash');
const catchAsyncErrors = require("./Middlewares/catchAsyncErrors");
const axios = require("axios");
const apiURL = process.env.API_URL;
const adminSecret = process.env.API_SECRET;

exports.getBlogData = catchAsyncErrors(async (req, res, next) => {

  const headers = {
    'x-hasura-admin-secret': adminSecret,
  };
  const response = await axios.get(apiURL, { headers });
  if (response.status >= 400) {
    return next(new ErrorHandler(`API return an error`, 505));
  }
  const { data } = response;
  const { blogs } = data;

  const totalBlogs = blogs.length;
  console.log(totalBlogs);
  const longestTitleBlog = _.maxBy(blogs, (blog) => (blog && blog.title) ? blog.title.length : 0);
  const privacyTitleBlogs = _.filter(blogs, (blog) => blog.title.toLowerCase().includes('privacy'));
  const uniqueTitles = _.uniqBy(blogs, 'title');

  const analyticsResponse = {
    totalBlogs: totalBlogs,
    longestBlogTitle: longestTitleBlog.title,
    blogsWithTitlePrivacy: privacyTitleBlogs.length,
    uniqueBlogTitles: uniqueTitles.map((blog) => blog.title),
  };

  res.json(analyticsResponse);
})

exports.blogSearch = catchAsyncErrors(async (req, res, next) => {
  let query = req.query.query;
  console.log(query);
  if (!query) {
    return next(new ErrorHandler('Query parameter is required', 400));
  }
  query=query.toLowerCase();

  const headers = {
    'x-hasura-admin-secret': adminSecret,
  };

  const response = await axios.get(apiURL, { headers });

  if (response.status >= 400) {
    return next(new ErrorHandler(`API return an error`, 505));
  }

  const { data } = response;
  const { blogs } = data;

  const searchResults = _.filter(blogs, (blog) => {
    const title=blog.title.toLowerCase();
    return title.includes(query);
  });

  res.json(searchResults);
})