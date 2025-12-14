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


        // app.use('/furniture', furnitureRoutes(furnitureCollection))

        app.get('/furniture', async (req, res) => {
            const email = req.query.email
            const query = {}
            if (email) {
                query.email = email
            }
            const result = await furnitureCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/furniture/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await furnitureCollection.findOne(query)
            res.send(result)
        })
        app.post('/furniture', async (req, res) => {
            const data = req.body
            const result = await furnitureCollection.insertOne(data)
            res.send(result)
        })
        app.patch('/furniture/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: data,
            };
            const result = await furnitureCollection.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/furniture/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await furnitureCollection.deleteOne(query)
            res.send(result);
        })





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
