"use strict";
import axios from 'axios';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;


export async function askClaude(prompt, imagePath,imageMimeType ) {
  let template= `{
    "application":
    {
        "name": "Amazon Web Services Example222",
        "description": "An example AWS deployment architecture.",
        "useGeometry": false,
        "architectures":
        [
            {
                "name": "Amazon Web Services Example",
                "description": "An example AWS deployment architecture.",
                "applicationArchitectureModel":
                {
                    "components":
                    [
                        {
                            "name": "Spring PetClinic",
                            "description": "Allows employees to view and manage information regarding the veterinarians, the clients, and their pets.",
                            "componentType": "LogicalSystem",
                            "uiId": "1"
                        },
                        {
                            "name": "Web Application",
                            "description": "Allows employees to view and manage information regarding the veterinarians, the clients, and their pets.",
                            "componentType": "LogicalApplication",
                            "uiId": "2"
                        },
                        {
                            "name": "Component 1",
                            "componentType": "LogicalApplication",
                            "uiId": "3"
                        },
                        {
                            "name": "Component 2",
                            "componentType": "LogicalApplication",
                            "uiId": "4"
                        },
                        {
                            "name": "Spring GoatClinic",
                            "description": "Allows employees to view and manage information regarding the veterinarians, the clients, and their goats.",
                            "componentType": "LogicalSystem",
                            "uiId": "8"
                        },
                        {
                            "name": "Web Goat Application",
                            "description": "Allows employees to view and manage information regarding the veterinarians, the clients, and their goats.",
                            "componentType": "LogicalApplication",
                            "uiId": "9"
                        },
                        {
                            "name": "c1 uses c2",
                            "description": "c1 uses c2",
                            "componentType": "Connector",
                            "uiId": "5",
                            "source": "3",
                            "target": "4"
                        },
                        {
                            "name": "Reads goats from and writes to",
                            "description": "Reads goats from and writes to",
                            "componentType": "Connector",
                            "uiId": "12",
                            "source": "9",
                            "target": "10"
                        },
                        {
                            "name": "Reads from and writes to",
                            "description": "Reads from and writes to",
                            "componentType": "Connector",
                            "uiId": "13",
                            "source": "2",
                            "target": "6"
                        },
                        {
                            "name": "Reads from and writes to",
                            "description": "Reads from and writes to",
                            "componentType": "Connector",
                            "uiId": "14",
                            "source": "2",
                            "target": "7"
                        }
                    ]
                },
                "deploymentArchitectureModel":
                {
                    "environments":
                    [
                        {
                            "name": "Live",
                            "type": "Production",
                            "uiId": "3f27e718-fe2d-44a2-8305-1c195016ac65",
                            "components":
                            [
                                {
                                    "name": "Amazon Web Services",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "15"
                                },
                                {
                                    "name": "US-East-1",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "16"
                                },
                                {
                                    "name": "US-East-1",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "16"
                                },
                                {
                                    "name": "Route 53",
                                    "description": "Highly available and scalable cloud DNS service.",
                                    "componentType": "Infrastructure",
                                    "uiId": "17"
                                },
                                {
                                    "name": "Elastic Load Balancer",
                                    "description": "Automatically distributes incoming application traffic.",
                                    "componentType": "Infrastructure",
                                    "uiId": "18"
                                },
                                {
                                    "name": "Autoscaling group",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "19"
                                },
                                {
                                    "name": "Autoscaling group",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "19"
                                },
                                {
                                    "name": "Amazon EC2",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "20"
                                },
                                {
                                    "name": "Amazon EC2",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "20"
                                },
                                {
                                    "name": "Web Application",
                                    "componentType": "Infrastructure",
                                    "uiId": "21"
                                },
                                {
                                    "name": "Amazon RDS",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "22"
                                },
                                {
                                    "name": "Amazon RDS",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "22"
                                },
                                {
                                    "name": "MySQL",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "23"
                                },
                                {
                                    "name": "MySQL",
                                    "componentType": "PhysicalApplication",
                                    "uiId": "23"
                                },
                                {
                                    "name": "Database",
                                    "componentType": "Infrastructure",
                                    "uiId": "24"
                                }
                            ]
                        }
                    ]
                },
                "dataArchitectureModel":
                {
                    "components":
                    [
                        {
                            "name": "Database",
                            "description": "Stores information regarding the veterinarians, the clients, and their pets.",
                            "componentType": "LogicalDatastore",
                            "uiId": "6"
                        },
                        {
                            "name": "NoSqlDatabase",
                            "description": "Stores nosql information regarding the =.",
                            "componentType": "LogicalDatastore",
                            "uiId": "7"
                        },
                        {
                            "name": "Goat Database",
                            "description": "Stores information regarding the veterinarians, the clients, and their pets.",
                            "componentType": "LogicalDatastore",
                            "uiId": "10"
                        },
                        {
                            "name": "NoGoatDatabase",
                            "description": "Stores nosql information regarding the =.",
                            "componentType": "LogicalDatastore",
                            "uiId": "11"
                        }
                    ]
                },
                "views":
                [
                    {
                        "name": "System Context View",
                        "type": "SystemContextView",
                        "uiComponents":
                        [
                            {
                                "uiId": "1",
                                "x": 0,
                                "y": 100
                            },
                            {
                                "uiId": "8",
                                "x": 200,
                                "y": 100
                            }
                        ]
                    },
                    {
                        "name": "Spring PetClinic - System Context",
                        "type": "SystemDetailView",
                        "rootComponentUiId": "1",
                        "uiComponents":
                        [
                            {
                                "uiId": "2",
                                "x": 25,
                                "y": 55
                            },
                            {
                                "uiId": "13",
                                "x": 2,
                                "y": 3
                            },
                            {
                                "uiId": "14",
                                "x": 2,
                                "y": 3
                            },
                            {
                                "uiId": "6",
                                "x": 25,
                                "y": 55
                            },
                            {
                                "uiId": "7",
                                "x": 25,
                                "y": 55
                            }
                        ]
                    },
                    {
                        "name": "Spring GoatClinic - System Context",
                        "type": "SystemDetailView",
                        "rootComponentUiId": "8",
                        "uiComponents":
                        [
                            {
                                "uiId": "9",
                                "x": 25,
                                "y": 55
                            },
                            {
                                "uiId": "12",
                                "x": 2,
                                "y": 3
                            },
                            {
                                "uiId": "10",
                                "x": 25,
                                "y": 55
                            },
                            {
                                "uiId": "11",
                                "x": 25,
                                "y": 55
                            }
                        ]
                    },
                    {
                        "name": "Deployment Context View",
                        "type": "DeploymentContextView",
                        "uiComponents":
                        [
                            {
                                "uiId": "3f27e718-fe2d-44a2-8305-1c195016ac65",
                                "x": 0,
                                "y": 100
                            }
                        ]
                    },
                    {
                        "name": "Spring PetClinic - Deployment - Live",
                        "type": "DeploymentDetailView",
                        "rootComponentUiId": "3f27e718-fe2d-44a2-8305-1c195016ac65",
                        "uiComponents":
                        [
                            {
                                "uiId": "15",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "16",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "17",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "18",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "19",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "20",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "21",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "22",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "23",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "uiId": "24",
                                "x": 0,
                                "y": 0
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
 
 Use the exact same template as mentioned above and fill the values for the keys based on the image metioned below`

 prompt = prompt.trim();
 prompt =template +'\n'+ prompt;

  let messages = [{ role: 'user', content: [] }];
    try {
      messages[0].content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageMimeType,
          data: imagePath
        }
      });
    } catch (error) {
      console.error('Error processing image:', error.message);
      return null;
    }
  
  messages[0].content.push({ type: 'text', text: prompt });

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,//'max_tokens: 10000 > 4096, which is the maximum allowed number of output tokens for claude-3-sonnet-20240229'
        messages: messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
      }
    );
    console.log('API Response:', response.data);
    return response.data.content[0].text;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return null;
  }
}