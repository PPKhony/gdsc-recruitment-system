import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/utils/styles.css';
import '@/utils/custom.scss';

export const metadata: Metadata = {
  title: 'GDSC Internal',
  description: 'GDSC Internal',
  icons: {
    icon: 'images/TU-GDSC Logo chapter lockup template.png',
  },
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
