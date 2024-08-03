import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/utils/styles.css';
import '@/utils/custom.scss';

export const metadata: Metadata = {
  title: 'GDSC@TU Login Portal',
  description: 'GDSC@TU Login Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* <BootstrapClient /> */}
    </>
  );
}
