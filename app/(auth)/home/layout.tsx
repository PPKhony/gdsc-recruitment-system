import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Header from '@/components/RecrutementHeader';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/utils/styles.css';
import '@/utils/custom.scss';

export const metadata: Metadata = {
  title: 'GDSC@TU Member Register System',
  description: 'GDSC@TU Member Register System',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <>
      <Header />

      <main>
        <div className="form-bg-01">
          <Container className=" pb-5" style={{ minHeight: '100vh' }}>
            {children}
          </Container>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
