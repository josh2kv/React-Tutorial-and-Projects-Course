import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';
import jobSlice from './features/job/jobSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    allJobs: allJobsSlice,
    job: jobSlice,
  },
});
