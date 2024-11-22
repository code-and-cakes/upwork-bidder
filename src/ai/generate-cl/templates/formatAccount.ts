import { Account } from '@prisma/client';

export const formatApplicantInfo = (d: Account) => `
First Name: ${d.firstName}
Title: ${d.title}

Description:
${d.description}
`;
