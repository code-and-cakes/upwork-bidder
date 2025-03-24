import { JobDetails } from '../../../automation/types/job.types';

export const formatJobInfo = (d: JobDetails) => `
Job Title: 
<job_title>
${d.title}
</job_title>

Job Description: 
<job_description>
${d.description}
</job_description>

Required Skills: 
<required_skills>
${d.skills.join(', ')}
</required_skills>
${
  d.client
    ? `Client Info:
<client_info>
Country: ${d.client.clientCountry}
City: ${d.client.clientCity}
Company Domain: ${d.client.clientCompanyDomain}
Company Size: ${d.client.clientCompanySize}
Rating: ${d.client.clientRating}
Payment Verified: ${d.client.clientPaymentVerified ? 'Yes' : 'No'}
Jobs Posted: ${d.client.clientJobsPostedNumber}
Hire Rate: ${d.client.clientHireRate}
Open Jobs: ${d.client.clientOpenJobs}
Total Hires: ${d.client.clientTotalHires}
Total Spent: ${d.client.clientTotalSpentNumber}
Active Hires: ${d.client.clientActiveHires}
Hourly Rate: ${d.client.clientHourlyRateNumber}
Total Hours: ${d.client.clientTotalHoursNumber}
</client_info>`
    : ''
}
<client_business_domain>
Domain: ${d.domain || ''}
</client_business_domain>
`;
