import { logOutUser, getCurrentUser } from "../services/firebaseAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import images from "../utils/images";

const PageHeader = () => {
	const navigate = useNavigate();

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	const handleSignOut = () => {
		logOutUser()
			.then(() => {
				navigate("/sign-in");
			})
			.catch((error) => console.error(error));
	};

	if (isLoading) return <Loading />;
	if (isError) return console.error("username fetching failed");
	return (
		<>
			<header className="bg-white py-4 px-5 lg:px-22 text-[var(--text-color)] flex justify-between items-center">
				<Link to="/employees">
					<img src={images.logo} alt="Logo Icon" className="w-12" />
				</Link>
				<div className="dropdown dropdown-end ">
					<div tabIndex={0} role="button" className="btn m-1 ">
						{user}
						<img src={images.exit} alt="Exit Logo" />
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-[var(--accent-red)]"
					>
						<li className="text-white ">
							<button role="button" onClick={handleSignOut}>
								Log out
							</button>
						</li>
					</ul>
				</div>
			</header>
		</>
	);
};

export default PageHeader;
