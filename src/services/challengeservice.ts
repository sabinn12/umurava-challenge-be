import prisma from '../config/db';


// create a challenge service
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

// get all challenges service
export const getAllChallengesService = async () => {
    return prisma.challenge.findMany();
  };

// get a challenge by id service
export const getChallengeByIdService = async (id: string) => {
    return prisma.challenge.findUnique({
      where: { id },
    });
  };

// update a challenge service
export const updateChallengeService = async (id: string, data: Partial<{
    title: string;
    deadline: Date;
    duration: string;
    moneyPrize: string;
    contactEmail: string;
    description: string;
    brief: string;
    tasks: string;
  }>) => {
    return prisma.challenge.update({
      where: { id },
      data,
    });
  };

// delete a challenge service

export const deleteChallengeService = async (id: string) => {
    return prisma.challenge.delete({
      where: { id },
    });
  };
  
  
  
