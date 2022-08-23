import mongoose from 'mongoose';
import { mongooseAuthor } from "./model/Authors.js";
import { mongooseBook } from "./model/Books.js";

mongoose.connect('mongodb://0.0.0.0:27017/authorsInfo');

connect();

async function connect() {

    try {
        
        const book = await mongooseBook.create({
            name: "vsfvs",
            description: "fsfdfgdf",
            publishingDate: "2020-08-08",
            author: "fggfgdfg",
            pageAmount: 2323
        });

        const author = await mongooseAuthor.create({
            firstName: "string",
            lastName: "string",
            yearOfBirth: 1212
        });

        // const authorsModel = conn.model('Authors', mongooseAuthors);
        // const booksModel = conn.model('Books', mongooseBooks); 

        await booksLtoHAndAuthorsLtoHQuery();
    }

    catch(err) {
        console.log(`Error: ${err}`);
    }

    finally {
        mongoose.connection.close();
    }
}

async function booksLtoHAndAuthorsLtoHQuery() {
    const result = await mongooseBook.aggregate([
        { $match: { pageAmount: { $gt: 200 },
                    publishingDate: { $gt: new Date('2015'), $lt: new Date('2020') }, 
                    author: { "$regex": "^P"} } },

        { $sort: {
            "author": 1, "pageAmount": 1
        } },

        { $project: {
            name: 1, author: 1
        } }
    ]).exec();

    console.log(result);
}