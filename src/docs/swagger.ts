import { serve, setup } from "swagger-ui-express";
import express from "express";

const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Swagger Documentation for Umurava Challenge API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Server",
    },
  ],
  paths: {
    "/api/challenges": {
      get: {
        summary: "Get all challenges (Test Endpoint)",
        tags: ["get Challenges"],
        responses: {
          200: {
            description: "A list of challenges",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", description: "Challenge ID" },
                      title: { type: "string", description: "Title of the challenge" },
                      deadline: { type: "string", format: "date", description: "Deadline of the challenge" },
                      duration: { type: "string", description: "Duration of the challenge" },
                      moneyPrize: { type: "string", description: "Prize money" },
                      contactEmail: { type: "string", format: "email", description: "Contact email" },
                      description: { type: "string", description: "Detailed description" },
                      brief: { type: "string", description: "Brief description" },
                      tasks: { type: "string", description: "Tasks description" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/challenges/{id}": {
      get: {
        summary: "Get a Challenge by ID",
        description: "Retrieve a specific challenge by its unique ID.",
        tags: ["get Challenges"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The ID of the challenge to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Challenge retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", description: "Challenge ID" },
                    title: { type: "string", description: "Title of the challenge" },
                    deadline: { type: "string", format: "date", description: "Deadline of the challenge" },
                    duration: { type: "string", description: "Duration of the challenge" },
                    moneyPrize: { type: "string", description: "Prize money" },
                    contactEmail: { type: "string", format: "email", description: "Contact email" },
                    description: { type: "string", description: "Detailed description" },
                    brief: { type: "string", description: "Brief description" },
                    tasks: { type: "string", description: "Tasks description" },
                  },
                },
              },
            },
          },
          404: {
            description: "Challenge not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/challenges/create": {
      post: {
        summary: "Create a Challenge",
        description: "Endpoint to create a new challenge with detailed fields and validations.",
        tags: ["create Challenge"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Title of the challenge" },
                  deadline: { type: "string", format: "date", description: "Deadline of the challenge" },
                  duration: { type: "string", description: "Duration of the challenge" },
                  moneyPrize: { type: "string", description: "Prize money for the challenge" },
                  contactEmail: { type: "string", format: "email", description: "Contact email for the challenge" },
                  description: { type: "string", description: "Detailed description of the challenge" },
                  brief: { type: "string", description: "Brief summary of the challenge" },
                  tasks: { type: "string", description: "Tasks description for the challenge" },
                },
                required: [
                  "title",
                  "deadline",
                  "duration",
                  "moneyPrize",
                  "contactEmail",
                  "description",
                  "brief",
                  "tasks",
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Challenge created successfully.",
          },
          400: {
            description: "Validation error.",
          },
          500: {
            description: "Internal server error.",
          },
        },
      },
    },
    "/api/challenges/update/{id}": {
  put: {
    summary: "Update a Challenge",
    description: "Update an existing challenge's details by its unique ID.",
    tags: ["update Challenge"],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "The ID of the challenge to update",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "Updated title of the challenge" },
              deadline: { type: "string", format: "date", description: "Updated deadline of the challenge" },
              duration: { type: "string", description: "Updated duration of the challenge" },
              moneyPrize: { type: "string", description: "Updated prize money" },
              contactEmail: { type: "string", format: "email", description: "Updated contact email" },
              description: { type: "string", description: "Updated detailed description" },
              brief: { type: "string", description: "Updated brief description" },
              tasks: { type: "string", description: "Updated tasks description" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Challenge updated successfully.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "string", description: "Challenge ID" },
                title: { type: "string", description: "Updated title of the challenge" },
                deadline: { type: "string", format: "date", description: "Updated deadline of the challenge" },
                duration: { type: "string", description: "Updated duration of the challenge" },
                moneyPrize: { type: "string", description: "Updated prize money" },
                contactEmail: { type: "string", format: "email", description: "Updated contact email" },
                description: { type: "string", description: "Updated detailed description" },
                brief: { type: "string", description: "Updated brief description" },
                tasks: { type: "string", description: "Updated tasks description" },
              },
            },
          },
        },
      },
      400: {
        description: "Validation error.",
      },
      404: {
        description: "Challenge not found.",
      },
      500: {
        description: "Internal server error.",
      },
    },
  },
},
"/api/challenges/delete/{id}": {
  "delete": {
    "summary": "Delete a Challenge",
    "description": "Delete a challenge by its unique ID.",
    "tags": ["delete Challenge"],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "The ID of the challenge to delete.",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Challenge deleted successfully.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Challenge deleted successfully."
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Challenge not found.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Challenge not found."
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Error deleting challenge."
                },
                "error": {
                  "type": "string",
                  "example": "Detailed error message."
                }
              }
            }
          }
        }
      }
    }
  }
}
  }
};

const swaggerRouter = express.Router();
swaggerRouter.use("/", serve, setup(swaggerDocument));

export default swaggerRouter;

