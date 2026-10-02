import './globals.css';

export const metadata = {
  title: 'AI Research Agent',
  description: 'Multi-agent AI research assistant dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
