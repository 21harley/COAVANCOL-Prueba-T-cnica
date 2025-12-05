import dotenv from 'dotenv';

dotenv.config();

export default {
  datasourceUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/coavancol',
  port: process.env.PORT || 3000,
};
