export default () => ({
  SMTP_HOST: process.env.SMTP_HOST || '1025',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@cci.org',
  SMTP_SECURE: false,
  LOG_LEVEL: 'silly',
});
