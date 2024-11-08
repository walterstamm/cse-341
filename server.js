const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;
const bodyParser = require('body-parser');
const mongodb = require('./database/db');
const contactRoutes = require('./routes/contactRoutes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));







app.use("/contacts", contactRoutes);
app.use("/", (req, res) => {
    res.send("Hello World"); 
});


mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });


module.exports = router;
