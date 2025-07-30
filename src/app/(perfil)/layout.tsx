import LinhaFuncoes from "@/components/linhaFuncoes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <LinhaFuncoes />
      {children}
    </section>
  );
}
