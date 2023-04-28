const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/Social_Network_API', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(port, () => console.log(`You are now connected on 127.0.0.1:${port}`));