const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

const port = process.env.PORT || 3000;
const app = express();

// Prevent public stack traces on production
process.env.NODE_ENV === 'production' ? app.set('env', 'production') : app.set('env', 'development');

// Mddlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            res.status(400).send({
                message: 'Malformed request body has been sent!'
        });
    } else next();
});

// Default routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to CMS API"});
});

// Invalid routes
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : '404 Not found!'
    })
});

app.listen(port, () => {
    console.log(`CMS server is listening on port ${port}`);
});