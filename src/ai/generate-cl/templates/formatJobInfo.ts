import { JobInfo } from '../../../automation/types/job.types';

export const formatJobInfo = (d: JobInfo) => `
Job Title: "${d.title}"

Job Description: 
<job-description>
${d.description}"
</job-description>


Required Skills: ${d.skills}
`;
