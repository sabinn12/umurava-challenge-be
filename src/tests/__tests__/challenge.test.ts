import request from 'supertest';
import app from '../../app';
import prisma from '../../config/db';
import { ObjectId } from 'mongodb';

beforeAll(async () => {
  await prisma.challenge.createMany({
    data: [
      {
        id: new ObjectId().toString(),
        title: 'First Challenge',
        deadline: new Date(),
        duration: '5 days',
        moneyPrize: '500 USD',
        contactEmail: 'test1@example.com',
        description: 'First challenge description',
        brief: 'Brief for first challenge',
        tasks: 'Task 1',
        seniority: 'Junior', 
        skillsNeeded: ['HTML', 'CSS'], 
      },
      {
        id: new ObjectId().toString(),
        title: 'Second Challenge',
        deadline: new Date(),
        duration: '7 days',
        moneyPrize: '1000 USD',
        contactEmail: 'test2@example.com',
        description: 'Second challenge description',
        brief: 'Brief for second challenge',
        tasks: 'Task 2',
        seniority: 'Mid',
        skillsNeeded: ['HTML', 'CSS'], 
        
      },
    ],
  });
});

afterAll(async () => {
  await prisma.challenge.deleteMany({});
  await prisma.$disconnect();
});

describe('Challenge API Endpoints', () => {
  describe('GET /api/challenges', () => {
    it('should return all challenges', async () => {
      const response = await request(app).get('/api/challenges');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Challenges retrieved successfully');
      expect(response.body.challenges).toHaveLength(2);
    });

    it('should return an empty array if no challenges exist', async () => {
      await prisma.challenge.deleteMany({});
      const response = await request(app).get('/api/challenges');
      expect(response.status).toBe(200);
      expect(response.body.challenges).toHaveLength(0);
    });
  });

  describe('POST /api/challenges/create', () => {
    it('should create a new challenge', async () => {
      const newChallenge = {
        title: 'Third Challenge',
        deadline: new Date().toISOString(),
        duration: '3 days',
        moneyPrize: '300 USD',
        contactEmail: 'test3@example.com',
        description: 'Third challenge description',
        brief: 'Brief for third challenge',
        tasks: 'Task 3',
        seniority: 'Senior', 
        skillsNeeded: ['HTML', 'CSS'],

      };

      const response = await request(app)
        .post('/api/challenges/create')
        .send(newChallenge);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Challenge created successfully');
      expect(response.body.challenge).toMatchObject(newChallenge);

      const savedChallenge = await prisma.challenge.findUnique({
        where: { title: 'Third Challenge' },
      });
      expect(savedChallenge).not.toBeNull();
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidChallenge = { title: 'Incomplete Challenge' };

      const response = await request(app)
        .post('/api/challenges/create')
        .send(invalidChallenge);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation Error');
    });
  });

  describe('PUT /api/challenges/update/:id', () => {
    it('should update an existing challenge', async () => {
      const challenge = await prisma.challenge.findFirst(); // Fetch an existing challenge
      const updatedData = {
        title: 'Updated Challenge',
        duration: '10 days',
        moneyPrize: '2000 USD',
      };
  
      const response = await request(app)
        .put(`/api/challenges/update/${challenge?.id}`)
        .send(updatedData);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Challenge updated successfully');
      expect(response.body.updatedChallenge).toMatchObject(updatedData);
  
      // Verify the updated data in the database
      const updatedChallenge = await prisma.challenge.findUnique({
        where: { id: challenge?.id },
      });
      expect(updatedChallenge?.title).toBe(updatedData.title);
      expect(updatedChallenge?.duration).toBe(updatedData.duration);
      expect(updatedChallenge?.moneyPrize).toBe(updatedData.moneyPrize);
    });
  
    it('should return 404 if the challenge does not exist', async () => {
      const nonExistentId = new ObjectId().toString(); 
      const response = await request(app)
        .put(`/api/challenges/update/${nonExistentId}`)
        .send({ title: 'Nonexistent Challenge' });
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Challenge not found');
    });
  
    it('should return 400 if invalid fields are provided', async () => {
      const challenge = await prisma.challenge.findFirst();
      const response = await request(app)
        .put(`/api/challenges/update/${challenge?.id}`)
        .send({ title: 123 }); // Invalid field type
  
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation error');
    });
  });
  describe('DELETE /api/challenges/delete/:id', () => {
    it('should delete an existing challenge', async () => {
    const challenge = await prisma.challenge.findFirst(); // Fetch an existing challenge

    const response = await request(app)
      .delete(`/api/challenges/delete/${challenge?.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Challenge deleted successfully');

    // Verify the challenge is deleted from the database
    const deletedChallenge = await prisma.challenge.findUnique({
      where: { id: challenge?.id },
    });
    expect(deletedChallenge).toBeNull();
    });

    it('should return 404 if the challenge does not exist', async () => {
    const nonExistentId = new ObjectId().toString();

    const response = await request(app)
      .delete(`/api/challenges/delete/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Challenge not found');
    });
  });
  });
  