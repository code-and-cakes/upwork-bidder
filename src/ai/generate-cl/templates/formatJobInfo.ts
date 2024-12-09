import { JobDetails } from '../../../automation/types/job.types';

export const formatJobInfo = (d: JobDetails) => `
Job Title: 
<job_title>
${d.title}"
</job_title>

Job Description: 
<job_description>
${d.description}"
</job_description>

Required Skills: 
<required_skills>
${d.skills.join(', ')}
</required_skills>

Client info:
<client_business_domain>
Domain: ${d.domain || ''}
</client_business_domain>}
`;
