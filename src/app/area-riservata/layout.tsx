import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Area riservata',
  robots: { index: false, follow: false, nocache: true },
};

export default function AreaRiservataLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="staff-page min-h-[80vh] bg-[#ECE7DE] pb-24 pt-28 lg:pt-36">
      <div className="premium-container">{children}</div>
    </div>
  );
}
