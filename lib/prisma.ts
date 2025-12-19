import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  // global に prisma プロパティがあると TypeScript に伝える
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  sslaccept: 'accept',
});

// すでに global.prisma があればそれを使う、なければ新規作成
export const prisma = global.prisma ?? new PrismaClient({ adapter });

// 開発環境では global に保存してホットリロード時の二重生成を防ぐ
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
