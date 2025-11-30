const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
        // await client.connect();
        const db = client.db('home-decor')
        const furnitureCollection = db.collection('furniture');
        const furnitureRoutes = require('./routes/furnitureRoutes')

        app.use('/furniture', furnitureRoutes(furnitureCollection))
        // {_id:new ObjectId}

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
