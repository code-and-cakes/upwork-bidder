import { JobDuration, JobInfo } from '../../automation/types/job.types';

export const jobInfoMock: JobInfo = {
  client: {
    company: {
      domain: 'Finance & Accounting',
    },
    location: {
      country: '',
    },
  },
  description:
    'We are seeking talented engineers with a strong background in JavaScript/TypeScript and experience in Salesforce development. The ideal candidate will possess full-stack capabilities, including proficiency in frameworks such as React or Vue or Angular, along with backend knowledge in Node.js and AWS services. You will be responsible for developing scalable web applications and delivering high-quality solutions. If you thrive in a collaborative environment and are eager to tackle challenging projects, we want to hear from you!',
  skills: [
    'Full-Stack Development',
    'JavaScript',
    'API',
    'TypeScript',
    'React',
    'Node.js',
    'Salesforce',
  ],
  title: 'Full Stack Engineer with JavaScript/TypeScript and React Expertise',
  duration: JobDuration.medium,
  questions: [],
  budget: {
    hourly: {
      min: 10,
      max: 20,
    },
    fixed: {
      min: 100,
      max: 200,
    },
  },
  more30Hr: false,
};
