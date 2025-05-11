const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 flex justify-center items-center bg-[var(--main-bg)] text-white text-sm md:text-base mt-auto relative bottom-0 right-0">
      <p className="text-center">
        © {currentYear} Employees Management. All rights reserved. 
        Created by <a href="https://www.linkedin.com/in/muhammad-hisham-23544b253/" target="_blank" className="underline">Muhammad Hisham</a>
      </p>
    </footer>
  );
};

export default Footer;
