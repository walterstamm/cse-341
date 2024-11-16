const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getContact = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const client = await mongodb.getDb();
    const contact = await client.db().collection('contacts').find({_id: id}).toArray();
    if (!contact) {
        res.status(404).json({ error: 'Contact not found' });
    } else {
        console.log(contact);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    }
};

const getAllContacts = async (req, res) => {
    const client = await mongodb.getDb();
    const contacts = await client.db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const createContact = async (req, res) => {
    const contact = req.body;
    const client = await mongodb.getDb();
    const result = await client.db().collection('contacts').insertOne(contact);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const contact = req.body;
    const client = await mongodb.getDb();
    const result = await client.db().collection('contacts').replaceOne({_id: id}, contact);
    if (result.modifiedCount === 0) {
        res.status(404).json({ error: 'Contact not found' });
    } else {
        res.status(204).json(result);
    }
};

const deleteContact = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const client = await mongodb.getDb();
    const result = await client.db().collection('contacts').deleteOne({_id: id});
    if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Contact not found' });
    } else {
        res.status(204).json(result);
    }
};

module.exports = { getContact, getAllContacts, createContact, updateContact, deleteContact };
