import { MongoClient } from "mongodb";

const uri = "mongodb://0.0.0.0:27017";

connect();

async function connect() {

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("authorsInfo"); 
        const books = db.collection("books");
        const authors = db.collection("authors");
        
        console.log(`Connected to database ${db.databaseName}`); 

        await books.createIndex({
            name: "text",
            description: "text",
            pageAmount: -1
        });

        
        await getAllBooksOfAuthorQ("sadfsdfhftring");
        // create document and insert one
        const book = {
            name: "weeewew",
            description: "weweefwegww",
	        publishingDate: "2022-01-01",
	        author: "wewew",
	        pageAmount: "wadfsgewew"
        };
        
        await insertDoc(book, "books");

        const searchCursor = await books.find();
        const result = await searchCursor.toArray();
        console.table(result);
        
        const collection = await db.collections();
        collection.forEach( (col) => { console.log(col) });
    }

    catch(err) {
        console.log(`Error: ${err}`);
    }

    finally {
        client.close();
    }
}

async function insertDoc(documentName, collectionName) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("authorsInfo"); 

        await db.collection(collectionName).insertOne(documentName);  
    }

    catch(err) {
        console.log(`Error: ${err}`);
    }

    finally {
        client.close();
    }
}

async function printAllDocsInCollection(collectionName, query) {
    
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("authorsInfo");
        console.table(await (await db.collection(collectionName).find(query).toArray()).sort( (x, y) => {
            return x.pageAmount - y.pageAmount;
        }));
    }

    catch(err) {
        console.log(`Error: ${err}`);
    }

    finally {
        client.close();
    }
}

function getAllBooksOfAuthorQ(authorName) {

    const query = { author: { $eq: authorName } };
    printAllDocsInCollection("books", query);

}

function getBooksAccordingToNameOrDescription(bookName, description) {

    const query = { $or: [ { book: { $regex: ("^" + bookName + "*") } },
                  { book: { $regex: ("^" + description + "*") } } ] };

    printAllDocsInCollection("books", query);

}

function getAllBooksAbove250PagesFromHighToLow() {

    const query = { pageAmount: { $gt: 250 } };
    printAllDocsInCollection("books", query);
}

// הכוונה במה שכתוך על המהירות של השאילתות זה אירגון של האוספים כך שיהיה הכי מהיר להוציא מהם מה שצריך מהשאילתות
