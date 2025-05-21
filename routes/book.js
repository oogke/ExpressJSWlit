var express= require("express");
var router= express.Router();
var Book= require("../resources/book");
var Books=require("../models/book.model");
router.get("/",(req,res)=>
{
    res.render("book",{title:"Book App:title",bookList:Book});
})
router.get("/add",(req,res)=>
{
    res.render("addBook",{title:"Book App:title",bookList:Book});
})
router.post("/save",async function (req, res, next) {

  // Book.push({ ...req.body, _id: `00${Book.length + 1}` });
const book=await Books.create(req.body)
res.status(200).json(book);
  // res.redirect("/books");
});

router.get("/edit/:_id", function (req, res, next) {
  console.log(req.params._id);
  const book = Book.find((book) => book._id === req.params._id);
  res.render("editBook", { title: "Edit Books", book });
});

router.post("/saveEdited/:_id", function (req, res, next) {
  const currIndex = Book.findIndex((book) => req.params._id === book._id);
  Book.splice(currIndex, 1, { ...req.body, _id: req.params._id });
  res.redirect("/books");
});

 router.get('/delete/:id', function(req, res, next){
    console.log(req.params._id)
    const book= Book.find((book)=>book._id=== req.params.id)
    const currIndex= Book.findIndex(book=> req.params._id=== book._id)
    Book.splice(currIndex, 1);
    // Redirect to the homepage or send a success message
    res.redirect('/books'); // Redirect to the homepage
 })

module.exports=router;