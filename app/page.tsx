import createsupabaseServerClient from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createsupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/sign-in');
  } else {
    redirect('/main-page/tab/orders');
  }
}
