const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db');

// Configuration of dotenv file
dotenv.config();

// Database connection
connectDB()


const app = express();
// Routes import
const testRoute = require('./routes/testRoute');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const resturantRoute = require('./routes/resturantRoute')
const categoryRoute = require('./routes/categoryRoute')
const foodRoute = require('./routes/foodRoute')


// Middleware
app.use(cors())
app.use(express.json())
app.use(testRoute)
app.use(authRoute)
app.use(userRoute)
app.use(resturantRoute)
app.use(categoryRoute)
app.use(foodRoute)

// Home Route
app.get('/', (req, res, next) => {
    return res.status(200).send(`<h1>Welcome to the Restaurant Food Web App</h1>`);
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});