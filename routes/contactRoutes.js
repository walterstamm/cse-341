const express = require('express');
const router = express.Router();
const validateContact = require('../middleware/contactMiddleware');
const contactController = require('../controllers/contactController');

router.get('/:id', contactController.getContact);
router.get('/', contactController.getAllContacts);
router.post('/', validateContact, contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;