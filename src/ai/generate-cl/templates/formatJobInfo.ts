import { JobInfo } from '../../../automation/types/job.types';

export const formatJobInfo = (d: JobInfo) => `
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

{Client info:
<client_business_domain>
Domain: ${d.client?.company.domain || ''}
</client_business_domain>}
`;
