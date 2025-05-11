import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
const IntroPage = () => {
	return (
		<>
			<main className="flex justify-center items-center min-h-[90vh] flex-col gap-y-5">
        <h1 className="flex items-center gap-1 text-lg md:text-2xl text-[var(--text-color)] tracking-in-expand "><span>Employees</span> <img src={Logo} alt="Logo Icon" className="w-12" />  <span>Managment</span> </h1>
				<p className="text-center text-sm md:text-lg text-gray-500 italic">Manage Your Team, Effortlessly.</p>

				<div className="flex gap-6">
					<Link
						to="/sign-up"
						className="btn btn-neutral bg-[var(--main-bg)] outline-none shadow-none lg:text-2xl  transition-transform hover:scale-105"
					>
						Sign up
					</Link>
					<Link
						to="/sign-in"
						className="btn btn-info bg-white outline-none shadow-none border-[var(--main-bg)] lg:text-2xl  transition-transform hover:scale-105"
					>
						Sign in
					</Link>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default IntroPage;
