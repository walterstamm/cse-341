const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getContact = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const client = await mongodb.getDb();
    const contact = await client.db().collection('contacts').find({_id: id}).toArray();
    console.log(contact);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
};

const getAllContacts = async (req, res) => {
    const client = await mongodb.getDb();
    const contacts = await client.db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

module.exports = { getContact, getAllContacts };
