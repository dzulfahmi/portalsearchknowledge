import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js';
import cors from './middleware/CorsMiddleware.js';
import { errorHandler, notFound } from './middleware/ErrorMiddleware.js';

import contentRoutes from './routes/ContentRoutes.js';
import homeRoutes from './routes/HomeRoutes.js';
import userRoutes from './routes/UserRoutes.js';


dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT;
const ENV = process.env.APP_ENV;

if (ENV === 'staging' || ENV === 'development') {
  app.use(morgan('dev'))
}

// if (ENV === 'production' || ENV === 'staging') {
//   app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') 
//       res.redirect(`https://${req.header('host')}${req.url}`)
//     else
//       next()
//   })
// }

const __dirname = path.resolve()

if (ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.use(express.static('frontend/build'));
  // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });
  // app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}
// khusus untuk server api/ rest api
// if (ENV === 'production' || ENV === 'staging') {
//   app.use((req, res, next) => {
//       if (req.header('x-forwarded-proto') !== 'https')
//           res.redirect(`https://${req.header('host')}${req.url}`)
//       else
//           next()
//   })
// }

app.use(cors);
app.use(express.json());

app.use('/', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contents', contentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));
