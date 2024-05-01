require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

var cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
const usersRouter = require("./api/userListRoute");
const translationRoute = require("./api/translationRoute");
const translationSessionRoute = require("./api/translationSessionRoute");
app.use(express.json());
app.use("/user", usersRouter);
app.use("/translation", translationRoute);
app.use("/translationSession", translationSessionRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
