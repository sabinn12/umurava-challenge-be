import prisma from '../config/db';
import { Challenge } from '../utils/types/challenges';

class ChallengeService {
  // Create a challenge
  async createChallenge(data: Challenge) {
    return prisma.challenge.create({
      data,
    });
  }

  // Get all challenges
  async getAllChallenges() {
    return prisma.challenge.findMany();
  }

  // Get a challenge by ID
  async getChallengeById(id: string) {
    return prisma.challenge.findUnique({
      where: { id },
    });
  }

  // Update a challenge
  async updateChallenge(id: string, data: Partial<Challenge>) {
    return prisma.challenge.update({
      where: { id },
      data,
    });
  }

  // Delete a challenge
  async deleteChallenge(id: string) {
    return prisma.challenge.delete({
      where: { id },
    });
  }
}

// Export an instance of the service class
export default new ChallengeService();