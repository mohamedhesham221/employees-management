import images from "../utils/images";
import { useEmployees } from "../hooks/useEmployees";
import * as React from "react";
// Import UI Components
import {
	PageHeader,
	AddModal,
	EditModal,
	DeleteModal,
	Loading,
	Filters,
	Pagination,
	TableBody,
	Footer
} from "../components";

const Employees = () => {
	// State to store selected employee ID for edit/delete
	const [empID, setImpID] = React.useState(null);
	// State for the current filter value (e.g., "All", "Manager", etc.)
	const [currentFilter, setCurrentFilter] = React.useState("All");
	// State for search input value
	const [searchText, setSearchText] = React.useState("");
	// State to track which type of filter is active (role, salary, rate)
	const [currentFilterType, setCurrentFilterType] = React.useState("role");
	// Refs to reset other filters when one is changed
	const refs = {
		rate: React.useRef(),
		role: React.useRef(),
		salary: React.useRef(),
	};
	// Handle filter dropdown change
	const handleChange = (e) => {
		setCurrentFilter(e.target.value);
		setCurrentFilterType(e.target.id);
	};
	// Handle search input
	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};
	// Reset other filter dropdowns when filter type changes
	React.useEffect(() => {
		const defaultValues = {
			rate: "greater-than-0",
			salary: "greater-than-$0",
			role: "All",
		};

		Object.entries(refs).forEach(([key, ref]) => {
			if (key !== currentFilterType && ref.current) {
				ref.current.value = defaultValues[key];
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentFilterType]);
	// Table headers
	const tableHeaders = [
		"#",
		"Name",
		"Role",
		"Email",
		"Phone",
		"Age",
		"Country",
		"Salary",
		"Evalution",
		"Start Date",
	];
	// Fetch employees data using custom hook
	const { data = [], isLoading, isError } = useEmployees();
	// Current page number for pagination
	const [currentPage, setCurrentPage] = React.useState(1);
	// Array of paginated data (each index is one page)
	const [slicedData, setSlicedData] = React.useState([]);
	// Total number of pages based on the data length
	const [totalPages, setTotalPages] = React.useState(0);

	// Run pagination logic whenever the data changes
	React.useEffect(() => {
		// Exit early if there's no data
		if (!data || data.length === 0) return;

		const itemsPerPage = 6;
		const calcPages = Math.ceil(data.length / itemsPerPage); // Calculate total pages
		// Split the data array into chunks (pages)
		function paginateData(data) {
			const paginatedData = [];
			for (let i = 0; i < calcPages; i++) {
				const start = i * itemsPerPage;
				const end = start + itemsPerPage;
				paginatedData.push(data.slice(start, end));
			}
			return paginatedData;
		}
		const paginatedData = paginateData(data);
		setSlicedData(paginatedData);
		setTotalPages((prev) => (prev !== calcPages ? calcPages : prev));
	}, [data]);

	// Handle loading and error states
	if (isLoading) return <Loading />;
	if (isError) return <div className="text-red-500">fetching failed</div>;

	return (
		<>
			<PageHeader />
			<main className="text-[var(--text-color)] py-4 px-5 lg:px-22 bg-[#f9fbfc]">
				<section className="flex justify-between items-center">
					<h1 className="italic md:text-3xl">Employees</h1>
					<button
						className="btn bg-[var(--accent-blue)]"
						onClick={() => (document.getElementById("add_modal").open = true)}
					>
						Add Employe <img src={images.add} alt="Add icon" />{" "}
					</button>
				</section>
				{/* Filters and Search */}
				<div className="py-4">
					<div className="flex flex-col md:flex-row justify-center items-center gap-2">
						<Filters
							currentFilter={currentFilter}
							handleChange={handleChange}
							refs={refs}
							handleSearch={handleSearch}
						/>
					</div>
					{/* If no data, show message */}
					{!data.length ? (
						<div className="text-[var(--text-color)] text-3xl flex flex-col justify-center w-full min-h-[50vh] items-center">
							<p>There is no employees yet !!</p>
							<p>Add new employe</p>
						</div>
					) : (
						// Table with employees data
						<div className="overflow-x-auto pb-5">
							<table className="table  table-sm lg:table-md text-[var(--text-color)] bg-white mt-4 px-5  rounded-xl ">
								<thead className="text-[var(--text-color)] py-4 ">
									<tr className="border-b border-[var(--table-border)] text-center">
										{tableHeaders.map((th, index) => {
											return <th key={index}>{th}</th>;
										})}
										<th>
											<img
												src={images.gear}
												alt="Setting Icon"
												className="mx-auto"
											/>
										</th>
									</tr>
								</thead>
								{/* Table Body */}
								<TableBody
									data={slicedData[currentPage - 1]}
									setImpID={setImpID}
									currentFilter={currentFilter}
									currentFilterType={currentFilterType}
									searchText={searchText}
								/>
							</table>
							<div className="text-[var(--text-color)] flex flex-wrap justify-between items-center mt-3">
								<p>
									<b>{currentPage}</b> out of {totalPages}
								</p>
								<Pagination
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									totalPages={totalPages}
								/>
							</div>
						</div>
					)}
				</div>
			</main>
			{/* Modals */}
			<AddModal />
			<EditModal id={empID} />
			<DeleteModal id={empID} />
			<Footer />
		</>
	);
};

export default Employees;
