import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/db'; 
import challengeRoutes from './routes/challengeroute';
import swaggerDocs from './docs/swagger';
import e from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/challenges', challengeRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerDocs);


app.listen(PORT, () => {
  console.log(`Server is running `);
  console.log(`Swagger documentation is available at ${PORT}/api-docs`);
});

prisma
  .$connect()
  .then(() => console.log('Connected to mongodb successfully'))
  .catch((error: unknown) => console.error('Database connection failed', error));

export default app;