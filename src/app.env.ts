import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
  cloudinary: {
    name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    secret: process.env.API_SECRET,
  },
}));
