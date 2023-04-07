import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3100;
const app = express();
mongoose.set('strictQuery', true);

// Connect to the MongoDB database
mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_DEV_URL : process.env.MONGO_URL || '');

app.use(cors())

// Set Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
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
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

export default app;