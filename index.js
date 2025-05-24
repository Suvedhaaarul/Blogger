import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const blogs=[];

app.get("/",(req,res)=>{
    res.render("home",{
        blog: blogs
    });
})

app.get("/post",(req,res)=>{
    res.render("post");
})

app.post("/submit",(req,res)=>{
    const blog = {
        id : Date.now().toString(),
        title : req.body.title,
        content : req.body.content,
    };
    blogs.push(blog);
    res.redirect("/");
})

app.post("/edit/:id",(req,res)=>{
    const blogToEdit = blogs.find((b)=>b.id === req.params.id);
    res.render("edit",{blog: blogToEdit});
})

app.post("/update/:id",(req,res)=>{
    const index = blogs.findIndex((b)=>b.id === req.params.id);
    blogs[index].title = req.body.title;
    blogs[index].content = req.body.content;
    res.redirect("/");
})

app.post("/delete/:id",(req,res)=>{
    const index = blogs.findIndex((b)=>b.id === req.params.id);
    blogs.splice(index,1);
    res.redirect("/");
})


app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})