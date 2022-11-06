import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={
          "bg-zinc-200 text-zinc-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-200 "
        }
      >
        <div className="flex justify-center items-center min-h-screen pt-4 pb-6 px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
