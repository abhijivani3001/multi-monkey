import { Client, Account } from 'appwrite';
import getEnvVar from '@/utils/getEnvVar';

export const client = new Client()
  .setEndpoint(getEnvVar('VITE_APPWRITE_API_ENDPOINT')) // Your API Endpoint
  .setProject(getEnvVar('VITE_APPWRITE_PROJECT_ID')); // Your project ID

export const account = new Account(client);
