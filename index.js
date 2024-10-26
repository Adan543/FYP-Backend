const bodyParser = require('body-parser');
require('./models/index.js')
const express = require('express');
const cors = require('cors');
const generalMessage = require('./constants/messages/general.messages')
const authMiddleware = require('./middleware/authMiddleware.js')
const http_response = require('./helper/http_response.js');
const app = express()
require('dotenv').config();


app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(cors())



//jwt verification
// app.use(async (req, res, next) => {
//     let auth_bypass = ['/login', '/sign-up'];
//     auth_bypass.find(url => req.url.includes(url))

//     if (auth_bypass.find(url => req.url.includes(url))) {
        
//         next();
//     }else {
//        authMiddleware(req,res,next)
//     }
// })





// Function to set routes
const settingRoutes = () => {
    // Load your routes
    const indexRouter = require('./routes/index.js');
    const userRouter = require('./routes/user.js');
    const servicesRouter = require('./routes/service.js')

    // Use the routes
    app.use('/', indexRouter);
    app.use('/users', userRouter);
    app.use('/services', servicesRouter);
};

// Start setting routes and handle errors
try {
    settingRoutes();
} catch (err) {
    console.error(err);
    
    console.error(`Error setting routes: ${err.message}`);

}

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
