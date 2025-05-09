import Footer from "../components/Footer";

const RegisterLayout = ({title,children}) => {
	return <>
  <header className="mt-20 md:mt-32 text-center text-[var(--text-color)] text-2xl font-semibold md:text-5xl">{title}</header>
  <main className="px-5 py-3 md:mx-auto md:w-[500px]">
    {children}
  </main>
  <Footer />
  </>;
};

export default RegisterLayout;
