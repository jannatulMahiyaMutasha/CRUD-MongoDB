const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const router = require('./router/api');
const app = express();
const port = 8000;


const url = 'mongodb://localhost:27017';
const dbName = "studentDB";

let dB = null;


// Connect to MongoDB
const connectToDB = async () => {
    const client = new MongoClient(url)
    await client.connect()
    dB = client.db(dbName)
    console.log('Connected to MongoDB')
    return dB;
}


app.use(bodyParser.json())

connectToDB().then((database) => {
    app.use((req, res, next) => {
        req.dB = database;
        next()
    })

    // routes

    app.use("/api", router)


}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);

})


app.listen(port, () => {
    console.log("Server is listening on port:", port);

});



