import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="mb-5 min-h-screen w-full">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
