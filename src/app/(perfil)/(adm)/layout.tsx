import AdmFuncoes from "@/components/admFuncoes";

export default function LayoutAdm({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <AdmFuncoes />
      {children}
    </section>
  );
}