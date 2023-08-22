import { SideBar } from "@/components/layout/sidebar";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row">
      <SideBar />
      <div className="sm:p-20 container p-5">{children}</div>
    </section>
  );
}
