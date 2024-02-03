import { check } from "express-validator";
import {
  addBooks,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controller/book_controller";
import express from "express";

const router = express();

router.post(
  "/add-book",
  [
    check("title", "title is required").notEmpty(),
    check("author", "author is required").notEmpty(),
    check("no_of_pages", "no of pages is required").isNumeric().notEmpty(),
    check("published_at", "published at is required").notEmpty(),
  ],
  addBooks
);
router.get("/get-books", getBooks);
router.get("/getbookById/:id", getBookById);
router.put(
  "/update-book/:id",
  [
    check("title", "title is required").notEmpty(),
    check("author", "author is required").notEmpty(),
    check("no_of_pages", "no of pages is required").isNumeric().notEmpty(),
    check("published_at", "published at is required").notEmpty(),
  ],
  updateBook
);
router.delete("/delete-book/:id", deleteBook);

export default router;