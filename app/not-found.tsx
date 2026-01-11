import Link from 'next/link';

const TWStyle = {
  ss: 'min-h-screen flex flex-col text-center items-center justify-center p-10 gap-4',
  h1s: 'text-6xl leading-none border-b',
  ps: 'text-4xl italic',
  Ls: 'bg-blueviolet hover:bg-purple-700 hover:scale-105 hover:text-white text-black font-bold rounded-full transition-all duration-300 shadow-lg transform max-w-sm py-3 px-8',
} as const;

export default function NotFound() {
  return (
    <main>
      <section className={TWStyle.ss}>
        <h1 className={TWStyle.h1s}>404 -Not Found-</h1>
        <p className={TWStyle.ps}>お探しのページが見つかりませんでした</p>
        <Link href="/main-page/tab/orders" className={TWStyle.Ls}>
          クリックすると最初の画面に戻ります！
        </Link>
      </section>
    </main>
  );
}
