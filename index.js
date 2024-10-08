const bodyParser = require('body-parser');
require('./models/index.js')
const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config();


app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(cors())

// Function to set routes
const settingRoutes = () => {
    // Load your routes
    const indexRouter = require('./routes/index.js');
    const userRouter = require('./routes/user.js');

    // Use the routes
    app.use('/', indexRouter);
    app.use('/users', userRouter);
};

// Start setting routes and handle errors
try {
    settingRoutes();
} catch (err) {
    console.error(`Error setting routes: ${err.message}`);
}

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
