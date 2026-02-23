import "./globals.css";

export const metadata = {
  title: "CHOZEN \u2014 IP & Brand Guidelines",
  description: "CHOZEN Center for Regenerative Living \u2014 IP Offering, Fee Schedules, Organizational Structure & Brand Guidelines",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
