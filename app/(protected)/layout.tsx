import createsupabaseServerClient from "@/lib/supabaseServer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProtectedLayout({ children }: any) {
  await createsupabaseServerClient();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
