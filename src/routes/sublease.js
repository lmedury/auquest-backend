const express = require('express');
const { setupMongoDb } = require('../config/mongo_sb_setup');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.post('/post', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'subleases'; 
        const collection = database.collection(collectionName);
        await collection.insertOne(req.body);
        res.json({success: true})
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/all', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'subleases'; 
        const collection = database.collection(collectionName);
        const result = await collection.find({}).toArray();
        res.json(result)
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/offers', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'sublease_offers'; 
        const collection = database.collection(collectionName);
        const result = await collection.find({}).toArray();
        res.json(result)
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.post('/update-status', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'sublease_offers'; 
        const collection = database.collection(collectionName);
        const filter = { _id: new ObjectId(req.body.offer_id) };

        // Use updateOne for updating a single document
        const result = await collection.updateOne(filter, { $set: req.body.update_data });

        if (result.modifiedCount > 0) {
            res.json({success:true})
        } else {
            res.json({success:false})
        }
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/unit/:id', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'subleases'; 
        const collection = database.collection(collectionName);
        const objectId = new ObjectId(req.params.id);
        const result = await collection.findOne({_id: objectId});
        res.json(result);
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.post('/make-offer', async (req, res) => {
    const client = setupMongoDb();
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const database = await client.db(process.env.MONGODB_DATABASE);
        const collectionName = 'sublease_offers'; 
        const collection = database.collection(collectionName);
        await collection.insertOne(req.body);
        res.json({success: true})
    } catch (err) {
        res.json({success: false, err: err.message})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});


module.exports = router;