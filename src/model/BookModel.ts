import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  no_of_pages: number;
  published_at: Date;
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  no_of_pages: {
    type: Number,
    required: true,
  },
  published_at: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  collection: 'books', 
});


const BookModel = mongoose.model<IBook>('Book', BookSchema);

export default BookModel;
