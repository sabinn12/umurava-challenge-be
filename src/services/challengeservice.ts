import prisma from '../config/db';
import { Challenge } from '../utils/types/challenges';

class ChallengeService {
  
  async createChallenge(data: Challenge) {
    return prisma.challenge.create({
      data,
    });
  }

  
  async getAllChallenges(offset: number, limit: number) {
    
    const challenges = await prisma.challenge.findMany({
      skip: offset,
      take: limit,
    });

    const total = await prisma.challenge.count();
  
    return { challenges, total };
  }
  
  
  async getChallengeById(id: string) {
    return prisma.challenge.findUnique({
      where: { id },
    });
  }

  
  async updateChallenge(id: string, data: Partial<Challenge>) {
    return prisma.challenge.update({
      where: { id },
      data,
    });
  }

  
  async deleteChallenge(id: string) {
    return prisma.challenge.delete({
      where: { id },
    });
  }
}


export default new ChallengeService();