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
        
        // const collection = await db.collections();
        // collection.forEach( (col) => { console.log(col) });
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

async function printAllDocsInCollection(collectionName) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("authorsInfo"); 
        const collection = db.collection(collectionName);
        const searchCursor = await collection.find();
        const result = await searchCursor.toArray();
        console.table(result);  
    }

    catch(err) {
        console.log(`Error: ${err}`);
    }

    finally {
        client.close();
    }
}