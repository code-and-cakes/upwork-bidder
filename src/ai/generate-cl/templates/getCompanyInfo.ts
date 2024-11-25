export const getCompanyInfo = (d: { name: string; overview: string }) => `
Company Name:
<company_name>
${d.name}
</company_name>

Company Overview:
<company_overview>
${d.overview}
</company_overview>
`;
