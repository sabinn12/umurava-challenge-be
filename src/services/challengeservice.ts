import prisma from '../config/db';

export const createChallengeService = async (data: {
  title: string;
  deadline: Date;
  duration: string;
  moneyPrize: string;
  contactEmail: string;
  description: string;
  brief: string;
  tasks: string; // Single text field
}) => {
  return prisma.challenge.create({
    data,
  });
};
