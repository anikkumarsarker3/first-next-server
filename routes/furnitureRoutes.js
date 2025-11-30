const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
module.exports = (furnitureCollection) => {
    router.get('/', async (req, res) => {
        const email = req.query.email
        const query = {}
        if (email) {
            query.email = email
        }
        const result = await furnitureCollection.find(query).toArray();
        res.send(result)
    })
    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await furnitureCollection.findOne(query)
        res.send(result)
    })
    router.post('/', async (req, res) => {
        const data = req.body
        const result = await furnitureCollection.insertOne(data)
        res.send(result)
    })
    router.patch('/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: data,
        };
        const result = await furnitureCollection.updateOne(query, updateDoc);
        res.send(result);
    })
    router.delete('/:id', async (req, res) => {
        const id = req.params.id
        const query = {
            _id: new ObjectId(id)
        }
        const result = await furnitureCollection.deleteOne(query)
        res.send(result);
    })
    return router

}