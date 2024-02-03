import { validationResult } from "express-validator";
import BookModel from "../model/BookModel";
import { Request, Response } from "express";
import mongoose from "mongoose";



//AddBooks
export const addBooks = async (req:Request, res:Response) =>{
try {

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const {title, author,no_of_pages,published_at} = req.body;

    const save_book = await BookModel.create({
        title,
        author,
        no_of_pages,
        published_at
    })
    if(!save_book){
        return res.status(404).json({
            error:"Error in Saving Book"
        })
    }

    res.status(200).json({
        message:"Book Save Successfully"
    })
    
    
} catch (error) {
    res.status(500).json({
        error:`Internal Server Error ${error}`
    })   
}
}

//getAllBooks
export const getBooks =async (req: Request, res:Response) =>{
try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const totalBook = await BookModel.countDocuments();

    const totalPages = Math.ceil(totalBook / limit);

    const paginatedBooks = await BookModel.find()
    .skip(startIndex)
    .limit(limit);

     if (!paginatedBooks) {
            return res.status(404).json({ message: 'No books found.' });
        }

        res.status(200).json({
            message:"get All Books Successfully", 
            books: paginatedBooks, 
            currentPage: page, 
            totalPages });
    
} catch (error) {
    res.status(500).json({
        error:`Internal Server Error ${error}`
    })
}

}

//get Book By Id
export const getBookById = async(req:Request,res:Response) =>{
try {

    const BookId = req.params.id;

    if(!BookId || !mongoose.isValidObjectId(BookId)){
        return res.status(400).json({
            message: "Invalid Book ID"
        });

    }

    const single_book= await BookModel.findById(BookId);
    if(!single_book){
        return res.status(400).json({
            message:"No Book Found"
        })
    }
     res.status(200).json({
        message:"Successfully found Book",
        book: single_book
     })
    
    
} catch (error) {
    res.status(500).json({
        error:`Internal Server Error ${error}`
    })
    
}
}

//Update Book
export const updateBook = async(req:Request,res:Response) =>{


try {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const BookId = req.params.id;
    const{ title, author, no_of_pages,published_at} =req.body;

    if(!BookId || !mongoose.isValidObjectId(BookId)){
        return res.status(400).json({
            message: "Invalid Book ID"
        });

    }

    const update_book= await BookModel.findByIdAndUpdate(BookId,
        { title, author, no_of_pages,published_at},
        {new:true}
        );
    if(!update_book){
        return res.status(400).json({
            message:"No Book Found to Update"
        })
    }

    res.status(200).json({
        message:"Book Updated Successfully",
    })
    
} catch (error) {
    res.status(500).json({
        error:`Internal Server Error ${error}`
    })
    
}
}


//Delete Book
export const deleteBook =  async (req:Request, res:Response) =>{

    try {

        const BookId = req.params.id;

        if(!BookId || !mongoose.isValidObjectId(BookId)){
            return res.status(400).json({
                message: "Invalid Book ID"
            });
    
        }
    
        const delete_book= await BookModel.findByIdAndDelete(BookId);
        if(!delete_book){
            return res.status(400).json({
                message:"No Book Found to delete"
            })
        }

        res.status(200).json({
            message:"Book Deleted Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            error:`Internal Server Error ${error}`
        })
        
    }
}

