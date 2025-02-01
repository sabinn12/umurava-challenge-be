export type Challenge = {
    title: string;
    deadline: Date;
    duration: string;
    moneyPrize: string;
    contactEmail: string;
    description: string;
    brief: string;
    tasks: string; 
    seniority: any[];
    skillsNeeded: string[];
    status?: string;
  };