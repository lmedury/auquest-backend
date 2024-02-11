const express = require('express');
const { setupMongoDb } = require('../config/mongo_sb_setup');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.post('/new', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'users'; // Replace with the desired collection name
        const collection = database.collection(collectionName);
        const user = {};
        user['Name'] = req.body.name;
        user['Email'] = req.body.email;
        user['Phone'] = req.body.phone;
        user['About'] = req.body.about;

        const hashedPassword = await bcrypt.hash(req.body.password, 5);
        user['Password'] = hashedPassword;
        // Create the collection
        await collection.insertOne(user);
        res.json({success: true})
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

router.post('/login', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'users'; // Replace with the desired collection name
        const collection = database.collection(collectionName);
        const result = await collection.find({ 'Email': req.body.email }).toArray();
        // Create the collection
        const passwordCompare = await bcrypt.compare(req.body.password, result[0]['Password']);
        if(passwordCompare){
            req.session.user = req.body.email;
        }
        res.json({success: passwordCompare})
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

router.get('/user', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'users'; // Replace with the desired collection name
        const collection = database.collection(collectionName);

        const email = req.query.email;

        const result = await collection.find({ 'Email': email }).toArray();
        res.json(result);
        //await database.createCollection(collectionName);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

router.get('/session', async (req, res) => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        res.json(req.session);
        //await database.createCollection(collectionName);
    } catch (err) {
        res.json(err);
    }
})

router.get('/logout', async (req, res) => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        req.session.destroy();
        res.json(true);
        //await database.createCollection(collectionName);
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;