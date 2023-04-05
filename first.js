const express = require("express");
// BOOK MANAGEMENT SYSTEM PROJECT

//Database
const database = require("./database");

//Initialise express
const booky = express();

/* 
    Route 
    Description    Get all the books
    Access         Public
    parameter      none
    Method         get
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});
/* 
    Route           /is/:ISBN
    Description    Get all the books
    Access         Public
    parameter      ISBN
    Method         get
*/
booky.get("/is/:ISBN",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.ISBN 

    )
    if(getSpecificBook.length ==0){
        //below code $ used for printing the output.
        return res.json({error:`No books found for ISBN ${req.params.ISBN}`})
    }

    return res.json({book: getSpecificBook});
});

/* 
    Route           /c
    Description    Get all the books
    Access         Public
    parameter      ISBN
    Method       get
*/

booky.get("/c/:category", (req,res) => {
 const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category) 
    // this will check if the parameter category includes or not.

 )
 if(getSpecificBook.length ==0){
    //below code $ used for printing the output.
    return res.json({error:`No books found for this category ${req.params.category}`})
}
return res.json({book: getSpecificBook});

});

/* 
    Route           /author/book
    Description    Get all the author.
    Access         Public
    parameter      None
    Method       get
*/

booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});

booky.get("/author/book/:ISBN",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author)=> author.books.includes(req.params.ISBN)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({error:`No books found in book of ISBN ${req.param.ISBN} `});
    }
    return res.json({authors: getSpecificAuthor});
});


/* 
    Route           /publications
    Description    Get all the author.
    Access         Public
    parameter      None
    Method       get
*/

booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
});

booky.listen(3000 ,() => {
    console.log("Server is running:");
});