import './globals.css';

export const metadata = {
  title: 'SADDAM LAKHO — Full-Stack Developer · AI Engineer | 3D Cinematic Portfolio',
  description: 'Awwwards-level 3D scroll-driven interactive personal brand portfolio for Saddam Lakho — Full-Stack Developer & AI Engineer.',
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#05070B] text-slate-100 selection:bg-blue-500 selection:text-white overflow-x-hidden antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
