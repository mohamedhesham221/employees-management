import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/firebaseDB";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { formatDate, formatAmount } from "../utils/common";
import images from "../utils/images";
import Footer from "../components/Footer";

const Employee = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["employees", id],
		queryFn: () => getEmployeeById(id),
	});
	if (isLoading) return <Loading />;
	if (isError) return <div className="text-red-500">fetching failed</div>;
	const { address, age, country,date, email, name, phoneNumber, rate, role, salary } =
		data.data;
console.log(data);

	const rolesColors = {
		"Manager": "bg-blue-500",
  "Designer": "bg-pink-500",
  "Developer": "bg-green-500",
  "HR": "bg-yellow-400",
  "Team Lead": "bg-purple-600",
  "Receptionist": "bg-orange-400"
	};
	return (
		<>
			<PageHeader />
			<main className="w-full min-h-[80vh] flex justify-center items-center p-6">
				<div className="card w-96 bg-white card-lg md:w-md shadow-sm">
					<div className="card-body text-[var(--text-color)]">
						<h2 className="card-title md:text-4xl">{name}</h2>
						<p
							className={`text-white w-fit px-3 rounded-2xl ${rolesColors[role]} border-0 flex justify-center items-center gap-1`}
						>
							{" "}
							<img src={images.job} alt="Briefcase icon" className="w-4 h-4"/> <span >{role}</span>
						</p>
						<div className="flex flex-col md:flex-row justify-between items-start gap-8">
							<div className="flex flex-col gap-2">
								<p className="flex items-center gap-2 text-[var(--table-header-text)]">
									{" "}
									<img src={images.pin} alt="Pin icon" /> <span className="whitespace-nowrap">
									{country}
									</span>
								</p>
								<p className="text-[var(--table-header-text)]">
									<span className="text-[var(--text-color)]">{age}</span> years
									old
								</p>
								<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Start Date
									</span>
									<span>{formatDate(date)}</span>
								</p>
							</div>
							<div className="flex flex-col gap-2">
							<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Home Address
									</span>
									<span>{address}</span>
								</p>
								<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Email Address
									</span>
									<span>{email}</span>
								</p>
								<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Phone Number
									</span>
									<span>{phoneNumber}</span>
								</p>
								<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Monthly Evaluation
									</span>
									<span className="flex items-center justify-start">
										{rate}{" "}
										{rate >= 5 ? (
											<img src={images.highRate} alt="Up Arrow icon" />
										) : (
											<img src={images.LowRate} alt="Down Arrow icon" />
										)}
									</span>
								</p>
								<p className="flex flex-col gap-1">
									<span className="text-[var(--table-header-text)]">
										Monthly Salary
									</span>
									<span>${formatAmount(salary)}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Employee;
