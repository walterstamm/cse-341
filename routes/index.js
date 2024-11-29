const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/login', passport.authenticate('github'),(req, res) => {});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;