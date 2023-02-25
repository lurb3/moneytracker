import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
mongoose.set('strictQuery', true);

// Connect to the MongoDB database
mongoose.connect(process.env.NODE_ENV === 'development' ? 'mongodb://localhost/moneytracker' : process.env.MONGO_URL);

// Define a simple schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the user router
app.use('/api', [
  routes.userRoute,
  routes.userSettingsRoute,
  routes.userAuthenticationRoute,
  routes.userExpensesRoute
]);

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

export default app;