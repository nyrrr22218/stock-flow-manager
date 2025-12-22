import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prisma: PrismaClient | undefined;
}
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  sslaccept: 'accept',
});

export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
