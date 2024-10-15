import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('emailConfig', () => ({
  transport: {
    secure: process.env.MAIL_SECURE === 'true',
  },
  defaults: {
    from: process.env.MAIL_FROM,
  },
  template: {
    dir: 'src/mail/templates',
    options: {
      strict: true,
    },
  },
}));
