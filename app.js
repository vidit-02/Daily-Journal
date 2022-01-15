const express=require("express");
const bodyParser=require("body-parser");
const ejs =require("ejs");
const app= express();
const _=require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogsDB")
const blogSchema=new mongoose.Schema({
  title: String,
  content: String
});
const Blog = mongoose.model("blog",blogSchema);

const posts=[blogSchema];
const homeStartingContent="Welcome to Daily Journal";
const aboutContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisi mi, convallis id quam ut, aliquet sagittis arcu. Fusce a pellentesque velit. Aliquam egestas a magna id pulvinar. Donec nisl nulla, volutpat mattis pharetra sit amet, pellentesque sed eros. Suspendisse id ex sit amet augue aliquam vulputate at eu enim. Curabitur pulvinar erat urna, interdum imperdiet mauris lacinia at. Pellentesque id tortor eu magna volutpat dapibus sed ac sapien.";
const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisi mi, convallis id quam ut, aliquet sagittis arcu. Fusce a pellentesque velit. Aliquam egestas a magna id pulvinar. Donec nisl nulla, volutpat mattis pharetra sit amet, pellentesque sed eros. Suspendisse id ex sit amet augue aliquam vulputate at eu enim. Curabitur pulvinar erat urna, interdum imperdiet mauris lacinia at. Pellentesque id tortor eu magna volutpat dapibus sed ac sapien.";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Blog.find({},function(err,post){
    if(err){
      console.log(err);
    }else{
      res.render("home",{
        startingContent: homeStartingContent,
        allposts:post});
    }
  });

});

app.get("/about",function(req,res){
  res.render("about",{startingContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{startingContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const blog= new Blog({
    title: req.body.title,
    content: req.body.post
  });
  blog.save();
  res.redirect("/");
});

app.get("/post/:postId",function(req,res){   //an express feature to access websites dynamically.
  var postid=req.params.postId;
  //var postname=_.lowerCase(req.params.postName); //function in lodash,to convert any text to lower case and can also used to access tittles with spaces in between words
  Blog.findOne({_id:postid},function(err,post){
    if(!err){
        res.render("post",
        {heading: post.title ,
         content: post.content});
    };
  });
});



app.listen(3000,function(){
  console.log("the server is running on port 3000");
});
