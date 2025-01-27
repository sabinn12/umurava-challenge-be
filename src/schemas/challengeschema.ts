import Joi from 'joi';

export const challengeValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters long',
  }),

  deadline: Joi.date().required().messages({
    'date.base': 'Deadline must be a date',
    'date.format': 'Deadline must be a valid date',
  }),

  duration: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Duration is required',
    'string.base': 'Duration must be a string',
  }),

  moneyPrize: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Money prize is required',
    'string.base': 'Money prize must be a string',
  }),

  contactEmail: Joi.string().email().required().messages({
    'string.empty': 'Contact email is required',
    'string.email': 'Contact email must be a valid email',
  }),

  description: Joi.string().min(10).max(250).required().messages({
    'string.empty': 'Description is required',
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description must not exceed 250 characters',
  }),

  brief: Joi.string().min(10).max(50).required().messages({
    'string.empty': 'Brief is required',
    'string.base': 'Brief must be a string',
    'string.min': 'Brief must be at least 10 characters long',
    'string.max': 'Brief must not exceed 50 characters',
  }),

  tasks: Joi.string().max(500).required().messages({
    'string.empty': 'Tasks description is required',
    'string.base': 'Tasks must be a string',
    'string.max': 'Tasks must not exceed 500 characters',
  }),
  seniority: Joi.string().valid('Junior', 'Mid', 'Senior').required().messages({
    'string.empty': 'Seniority is required',
    'string.base': 'Seniority must be a string',
    'any.only': 'Seniority must be one of: Junior, Mid, Senior',
  }),

  skillsNeeded: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.base': 'Skills needed must be an array',
    'array.min': 'At least one skill is required',
    'any.required': 'Skills needed is required',
  }),
});


export const updateChallengeValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must not exceed 100 characters',
    }),
  
    deadline: Joi.date().optional().messages({
      'date.base': 'Deadline must be a valid date',
      'date.format': 'Deadline must be a valid date',
    }),
  
    duration: Joi.string().min(3).max(20).optional().messages({
      'string.base': 'Duration must be a string',
      
    }),
  
    moneyPrize: Joi.string().min(2).max(50).optional().messages({
      'string.base': 'Money prize must be a string',
    }),
  
    contactEmail: Joi.string().email().optional().messages({
      'string.email': 'Contact email must be a valid email',
    }),
  
    description: Joi.string().min(10).max(250).optional().messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description must not exceed 250 characters',
    }),
  
    brief: Joi.string().min(10).max(50).optional().messages({
      'string.base': 'Brief must be a string',
      'string.min': 'Brief must be at least 10 characters long',
      'string.max': 'Brief must not exceed 50 characters',
    }),
  
    tasks: Joi.string().max(500).optional().messages({
      'string.base': 'Tasks must be a string',
      'string.max': 'Tasks must not exceed 500 characters',
    }),
    seniority: Joi.string().valid('Junior', 'Mid', 'Senior').optional().messages({
    'string.empty': 'Seniority is required',
    'string.base': 'Seniority must be a string',
    'any.only': 'Seniority must be one of: Junior, Mid, Senior',
  }),

  skillsNeeded: Joi.array().items(Joi.string()).min(1).optional().messages({
    'array.base': 'Skills needed must be an array',
    'array.min': 'At least one skill is required',
    'any.required': 'Skills needed is required',
  }),
  });
  
