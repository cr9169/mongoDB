import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name: {
        type: String,
        requireed: true
    },

    description: {
        type: String,
        requireed: true
    },

    publishingDate: {
        type: Date,
        requireed: true
    },

    author: {
        type: String,
        requireed: true
    },

    pageAmount: {
        type: Number,
        requireed: true
    },
});

export const mongooseBook = mongoose.model('Book', booksSchema); 