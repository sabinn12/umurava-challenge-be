import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/db'; 
import challengeRoutes from './routes/challengeroute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/challenges', challengeRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

prisma
  .$connect()
  .then(() => console.log('Connected to mongodb successfully'))
  .catch((error: unknown) => console.error('Database connection failed', error));
