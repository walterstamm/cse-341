const validateContact = (req, res, next) => {
    const {_id, firstName, lastName, email, favoriteColor,birthday} = req.body; 


    if ( !firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ error: 'Missing required fields: _id, firstName, lastName, email, favoriteColor, birthday' });
    }

    next();
};

module.exports = validateContact;