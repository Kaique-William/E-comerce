import ClienteFuncoes from "@/components/clienteFuncoes";
export default function LayoutCliente({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ClienteFuncoes/>
      {children}
    </section>
  );
}
