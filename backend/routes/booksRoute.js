import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


  
  // Route to save new book
  router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({}); // create a variable called products and set it to the result of the find method on the Product model
      res.status(200).json({
        count: books.length,
        data: books,
      }); // send the products as a JSON response
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route to get a single book
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params; // get the id from the request parameters
      const book = await Book.findById(id); // find the product by id using the findById method which is a mongoose method
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route to update a book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      } // check if all required fields are sent
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body);
      if (!book) {
        return res.status(404).send("Book not found");
      }
      const updatedBook = await Book.findById(id);
      return res.status(200).json({
        updated_item: updatedBook,
        message: "Book updated successfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route to delete a book
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).json({message: "Book deleted successfully"});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;