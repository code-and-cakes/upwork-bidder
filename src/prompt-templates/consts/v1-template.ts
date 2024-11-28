export const CC_PROMPT_TEMPLATE_V1_VALUE = `We need to write a cover letter for an Upwork job proposal.
As a context for the cover letter, you have the following information:
- The job proposal details
- Relevant company information
- Information about the person applying for the job
- 1 or 2 best-matching cases from our IT company.

Tone of voice: friendly, easy-to-read.
Please do not add any extra or non-factual information — only use the info provided.

<job_proposal>
{job}
</job_proposal>

<company_info>
{company}
</company_info>

<applicant_info>
{applicant}
</applicant_info>

<cases>
{cases}
</cases>

The structure of the cover letter should be as follows:
1. Hook + case demonstration:
- Start with a hook that grabs the client's attention
- skip salutation: no "hello" or "hi there". Go straight to the point. Skip any formalities, such as subject, too.
- Present the case that best match the job proposal. The idea is "You want a Data Management platform? Look, I've done that already!".
- Explain why the case is relevant to the job proposal.
- Focus on the metrics, results and benefits of the case.
- Be concise and to the point.

2. Second case demonstration (optional):
- If applicable, present the second best-matching case.
- Explain why the case is relevant to the job proposal.
- Focus on the metrics, results and benefits of the case.

3. Links (optional):
- include the links to upwork portfolios of the cases if any (found under "Link to Upwork" field in case description)

4. Facts about the applicant:
- Mention the applicant's skills, experience, and achievements.
- Explain why the applicant is the best fit for the job proposal.
- Be concise and to the point.

5. About our team/company (optional):
- if job proposal needs 2 or more people, mention that we have a team of professionals ready to work on the project.
- Use the following templates as reference: "My team & I can deliver a project of any complexity, and I would be very happy to jump on a call and convenience you!"

6. Call to action:
- Main idea here is to ask the client to jump on call.
- Use the following templates as reference: "Let's jump on a call, and I will convince you in it. \n Which time works best for you?" or "Is it worth chatting? Which time works best for you?"

7. Name of the applicant:
- End with the first name of the applicant.

Examples of good and effective cover letters:
<examples>
{examples}
</examples>

Answer:`;
