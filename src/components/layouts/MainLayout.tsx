import NavBar from '@/components/navbar/NavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 pt-2 w-9/12 mx-auto flex justify-center items-center">
          {children}
        </div>
      </div>
    </>
  );
}
