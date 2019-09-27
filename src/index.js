const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const router = express.Router();

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'Backend do App',
            title: 'Prova Facil API',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        produces: [
            "application/json",
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname, //app absolute path
    files: ['./controllers/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/mountControllers')(app);

app.listen(3000, () => {
    console.log('ProvaFacil app running on port 3000!')
});