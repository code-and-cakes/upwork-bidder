import * as process from 'node:process';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  from,
  to,
  text,
  html,
  subject,
}: {
  from: string;
  to: string;
  text?: string;
  html?: string;
  subject: string;
}) {
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
  });

  if (error) {
    console.error({ error });
  }
}
