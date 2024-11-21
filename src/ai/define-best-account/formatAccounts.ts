import { Account } from '@prisma/client';

export const formatAccount = (d: Account) => `
Account Id: ${d.id}
Name: ${d.firstName} ${d.lastName}
Description: ${d.description}
`;
