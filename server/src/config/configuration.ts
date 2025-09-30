export default () => ({
  SMTP_HOST: process.env.SMTP_HOST || 'mailpit',
  SMTP_PORT: process.env.SMTP_PORT || '1025',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@cci.org',
  SMTP_SECURE: false,
  LOG_LEVEL: 'silly',
});
