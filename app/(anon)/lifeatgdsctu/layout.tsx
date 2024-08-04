import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'GDSC@TU | LifeAtGDSC@TU',
  description: 'GDSC@TU | About',
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}