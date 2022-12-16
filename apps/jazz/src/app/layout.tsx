import NavBar from '@/components/Header/Navbar';
import '../styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-full flex-col">
          <NavBar />

          <main className="grow">
            <div className="mt-6 p-4 md:p-16">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
