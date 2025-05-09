import * as React from "react";
import { roles } from "../utils/common"; // Import list of roles for the role filter

// Filter component for role, salary, rate, and name search
const Filters = ({ handleChange, refs, handleSearch }) => {
	const salaryOptions = [
		{ value: "greater-than-$0", label: "Salary from $0" },
		{ value: "under-$5000", label: "Under $5000" },
		{ value: "above-$5000", label: "Above $5000" },
	];
	const rateOption = [
		{ value: "greater-than-0", label: "Rate from 0 to 5" },
		{ value: "under-4", label: "Under 4" },
		{ value: "above-4", label: "Above 4" },
	];
	return (
		<>
				      {/* Filter section: role, salary, and rate */}
			<div className="flex flex-col md:flex-row  justify-start items-start gap-2 w-full">
					<select
						className="select  select-md bg-white focus:outline-none rounded-2xl cursor-pointer border-[var(--main-bg)] px-4 py-2 w-full bg-size-[5px_4px]"
						id="role"
						defaultValue="All"
						onChange={handleChange} // Trigger handler when option is selected
						ref={refs.role} // Reference to access/select/reset from parent
					>
						<option value="All">All</option>
						{roles.map((option, index) => {
							return (
								<option key={index} value={option}>
									{option}
								</option>
							);
						})}
					</select>
				        {/* Salary Filter */}
					<select
						className="select select-md bg-white focus:outline-none rounded-2xl cursor-pointer border-[var(--main-bg)] px-4 py-2 w-full bg-size-[5px_4px]"
						id="salary"
						defaultValue="greater-than-$0"
						onChange={handleChange} // Trigger handler when option is selected
						ref={refs.salary} // Reference to access/select/reset from parent
					>
						{salaryOptions.map((option, index) => {
							return (
								<option value={option.value} key={index}>
									{option.label}
								</option>
							);
						})}
					</select>
				        {/* Rate Filter */}
					<select
						className="select select-md bg-white focus:outline-none rounded-2xl cursor-pointer border-[var(--main-bg)] px-4 py-2 w-full bg-size-[5px_4px]"
						id="rate"
						defaultValue="greater-than-0"
						onChange={handleChange} // Trigger handler when option is selected
						ref={refs.rate} // Reference to access/select/reset from parent
					>
						{rateOption.map((option, index) => {
							return <option value={option.value} key={index}>{option.label}</option>
						})}
					</select>
			</div>
			      {/* Search input field */}
			<div className="w-full flex justify-end">
				<label
					className="input group bg-white rounded-2xl border-[var(--main-bg)] grow md:grow-0"
					style={{ outline: "none" }}
				>
					<svg
						className="h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input
						type="search"
						className="grow "
						placeholder="search by name . . ."
						onChange={handleSearch}  // Trigger search on input change
					/>
				</label>
			</div>
		</>
	);
};

export default Filters;
