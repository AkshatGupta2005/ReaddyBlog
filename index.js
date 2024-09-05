import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const post = [
  [
    "Welcome to Readdy Blog",
    "Readdy Blog is your personal platform for self-expression, where your thoughts, stories, and ideas find a home. Whether you're capturing life's moments, exploring your passions, or sharing unique perspectives, this is the space to let your voice shine. With an easy-to-use interface, Readdy Blog empowers you to document your journey, connect with like-minded readers, and create content that resonates. Start writing today, and make your mark on the world with every post!",
    "12/12/12",
    "Default",
  ],
];

app.use(express.static("public"));

class createPost {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    var postContents = [title, content, datetime];
    post.unshift(postContents);
  }
}

function updatePost(index, title, content) {
  post.splice(index, 1);
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  var edited = "Edited";
  var postcontents = [title, content, datetime, edited];
  post.splice(index, 0, postcontents);
}

function deletePost(index) {
  post.splice(index, 1);
}

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs", { post: post });
});

app.get("/createPost", (req, res) => {
  res.render("post.ejs");
});
app.get("/views/:id", (req, res) => {
  let index = req.params.id;
  res.render("view.ejs", { thisPost: post[index], index: index });
});

app.post("/save", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  new createPost(title, content);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  deletePost(req.params.id);
  res.redirect("/");
});

app.post("/update/:id", (req, res) => {
  let index = req.params.id;
  res.render("post.ejs", { index: index, post: post[index] });
});

app.post("/updatePost/:id", (req, res) => {
  let index = req.params.id;
  let title = req.body.title;
  let content = req.body.content;
  updatePost(index, title, content);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server Active at ${port}`);
});
