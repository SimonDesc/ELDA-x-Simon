import express from 'express';
import bodyParser from 'body-parser';
import cors from './middleware/cors.js';
import snowDepthRoutes from './routes/snowDepthRoutes.js';


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors);
app.use(bodyParser.json());

// Routes
app.use('/api/snow-depth', snowDepthRoutes);

// Starting the server
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
