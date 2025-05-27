import express from 'express';
import ragRoute from './api/ragRoute';

const app = express();
app.use(express.json()); // Important for reading JSON body
app.use('/api', ragRoute); // Base path for the route

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
