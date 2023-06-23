import { configDotenv } from 'dotenv';
import populateEnv from 'populate-env';

export let env = {
  DATABASE_USER: '',
  DATABASE_PASSWORD: '',
  DATABASE_NAME: '',
};

configDotenv();
populateEnv(env, { mode: 'halt' });
