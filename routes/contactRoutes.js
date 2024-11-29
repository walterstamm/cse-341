const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validator = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');


router.get('/:id', isAuthenticated, validator.handleErrors(contactController.getContact));
router.get('/', validator.handleErrors(contactController.getAllContacts));
router.post('/', isAuthenticated, validator.saveContact, validator.handleErrors(contactController.createContact));
router.put('/:id', isAuthenticated, validator.saveContact, validator.handleErrors(contactController.updateContact));
router.delete('/:id', isAuthenticated, validator.handleErrors(contactController.deleteContact));
module.exports = router;