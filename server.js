const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/angular-todos'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-todos/'}),
);

app.listen(process.env.PORT || 8080);
