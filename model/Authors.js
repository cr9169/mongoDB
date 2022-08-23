import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    firstName: {
        type: String,
        requireed: true
    },

    lastName: {
        type: String,
        requireed: true
    },

    yearOfBirth: {
        type: Number,
        requireed: true
    },
});

export const mongooseAuthor = mongoose.model('Author', authorsSchema);
