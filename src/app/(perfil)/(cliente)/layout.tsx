import ClienteFuncoes from "@/components/linhaFuncoes/clienteFuncoes";
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
