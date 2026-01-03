import { Job } from '@/types/game';
import jobsData from './jobs.json';

export const ALL_JOBS: Job[] = jobsData as unknown as Job[];
export const BETTYS_BAKERY = ALL_JOBS[0];
