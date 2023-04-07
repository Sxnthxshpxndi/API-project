const express = require("express");
// BOOK MANAGEMENT SYSTEM PROJECT

//Database
const database = require("./database");

//Body parser (refer notes for details)
var bodyParser = require("body-parser");

//Initialise express
const booky = express();

//BODY PARSER...
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

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

//POST REQ
/* 
    Route           /book/new
    Description     add new books via post man application
    Access         Public
    parameter      None
    Method         post
*/

booky.post("/book/new",(req,res) => {
    const newBook = req.body; // Here body is the new content of the book , that has to be pushed.
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});

/* 
    Route           /author/new
    Description     add new authors via post man application
    Access         Public
    parameter      None
    Method         post
*/

booky.post("/author/new",(req,res)=> {
 const newAuthor = req.body;
 database.author.push(newAuthor);
 return res.json(database.author);
});

/* 
    Route           /publication/new
    Description     add new publications via post man application
    Access         Public
    parameter      None
    Method         post
*/

booky.post("/publication/new",(req, res)=> {
    const newPublication = req.body;
    database.author.push(newPublication);
    return res.json(database.publication);
});

// TASKS (REFER NOTES) FOR POST REQUEST

/* 
    Route           /publication/update/book
    Description     update / add new publication
    Access         Public
    parameter      isbn
    Method         put
*/


booky.put("/publication/update/book/:ISBN",(req, res)=> {
    //Update publication database
    database.publication.forEach((pub) => {
        if(pub.Id === req.body.pubId){
            return pub.books.push(erq.params.isbn);
        }
    });
     //Update book database
     database.books.forEach((book) => {
        if(book.ISBN == req.params.ISBN){
            book.publications = req.body.pubId;
            return;
        }
     });

    return res.json(
        {
        books: database.books,
        publications: database.publication,
        message: " Successfully updated publications"
    });
});

/* DELETE */


/* 
    Route          /book/delete/
    Description    delete a book 
    Access         Public
    parameter      isbn
    Method         delete
*/


booky.delete("/book/delete/:ISBN",(req, res)=>{
    /*Whichever book does not match with the isbn . just
    send it to an updatedBook Database array
    and rest will be filtered out.*/

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.ISBN
        )
    database.books = updatedBookDatabase;

    return res.json({books: database.books});

});

/* 
    Route          /book/delete/author
    Description    delete an author from a book and vice versa
    Access         Public
    parameter      isbn, authorId
    Method         delete
*/

booky.delete("/book/delete/author/:ISBN/:authorId",(req, res)=>{
    //Update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.ISBN){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });
    
    //Update  the author database.
    database.author.forEach((eachAuthor)=> {
        if(eachAuthor.id === parseInt(req.params.authorId)){
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.ISBN
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted"
    });

});



booky.listen(3000 ,() => {
    console.log("Server is running:");
});