// prisma.config.ts
import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

config({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'), // ここで接続URLを指定
  },
});
