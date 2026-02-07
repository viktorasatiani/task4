import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="h-40">
        <Navbar />
      </header>
      <main className="flex justify-center items-center">{children}</main>
    </>
  );
}
