import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db';
import cors from './middleware/CorsMiddleware';
import { errorHandler, notFound } from './middleware/ErrorMiddleware';

import userRoutes from './routes/UserRoutes';


dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT;
const ENV = process.env.APP_ENV;

if (ENV === 'staging' || ENV === 'local') {
  app.use(morgan('dev'))
}

if (ENV === 'production' || ENV === 'staging') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') 
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.use(cors);
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));
