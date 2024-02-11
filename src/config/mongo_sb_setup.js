module.exports.setupMongoDb = () => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = `mongodb+srv://lmedury:${process.env.MONGODB_PASSWORD}@cluster0.nvlps7c.mongodb.net/?retryWrites=true&w=majority`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    return client;
}