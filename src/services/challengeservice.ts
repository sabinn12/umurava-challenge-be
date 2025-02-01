import prisma from '../config/db';
import { Challenge } from '../utils/types/challenges';

class ChallengeService {
  
  async createChallenge(data: Challenge) {
    return prisma.challenge.create({
      data,
    });
  }

  
  async getAllChallenges(offset: number, limit: number ,status?: string) {

    const whereClause = status ? { status } : {};

    const challenges = await prisma.challenge.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalChallenges = await prisma.challenge.count();
  
    return { challenges, totalChallenges };
  }
   // Get challenge analytics
   async getChallengeAnalytics() {
    const openedChallenges = await prisma.challenge.count({
      where: { status: 'OPENED' },
    });

    const ongoingChallenges = await prisma.challenge.count({
      where: { status: 'ONGOING' },
    });

    const completedChallenges = await prisma.challenge.count({
      where: { status: 'COMPLETED' },
    });

    return { opened: openedChallenges,ongoing: ongoingChallenges,completed: completedChallenges,};
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