import NavBar from '@/components/navbar/NavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden">
        <NavBar />
        <div className="flex-1 py-2 w-9/12 mx-auto flex justify-center items-center z-20 ">
          {children}
        </div>
      </div>
    </>
  );
}
