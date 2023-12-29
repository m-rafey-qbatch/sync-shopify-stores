import * as dotenv from "dotenv";
dotenv.config();

export const AWS_CONFIG = {
  ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  SECRET_KEY: process.env.AWS_SECRET_KEY,
  SQS_QUEUE: process.env.SQS_QUEUE,
  REGION: process.env.REGION
};

export const DB_CONFIG = {
  CONN_STRING: process.env.DB_CONN_STRING,
  NAME: process.env.DB_NAME
};

export const B2B_STORE_NAMES = ["B2BSHOPISHERE"];