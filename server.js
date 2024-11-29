const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;
const bodyParser = require('body-parser');
const mongodb = require('./database/db');
const contactRoutes = require('./routes/contactRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const indexRoutes = require('./routes/index');
const cors = require('cors');

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

app.use(bodyParser.json())
.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use(bodyParser.urlencoded({ extended: true }))
.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}))
.use(cors({origin: '*'}))


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/',(req, res) => {
    res.send(req.session.user !== undefined ? `Welcome ${req.session.user.displayName}` : 'Please login');
});

app.get('/github/callback', passport.authenticate('github',
  {failureRedirect: '/api-docs',session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/contacts", contactRoutes);
app.use("/", indexRoutes);


mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });


module.exports = router;
