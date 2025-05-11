import * as React from "react";
import EmployeeRow from "./EmployeeRow";

const TableBody = ({
	data,
	setImpID,
	currentFilter,
	currentFilterType,
	searchText,
}) => {
	// Filter the data array based on role select
	const filteredRole = data?.filter(
		(employee) => employee.data.role === currentFilter
	);
// Filter the data array based on rate select
	const filteredRate = data?.filter((employee) => {
		if (currentFilter === "above-$5000") {
			return employee.data.salary >= 5000;
		} else if (currentFilter === "under-$5000") {
			return employee.data.salary < 5000;
		} else {
			return true;
		}
	});
// Filter the data array based on salary range select
	const filteredSalary = data?.filter((employee) => {
		if (currentFilter === "above-4") {
			return employee.data.rate >= 4;
		} else if (currentFilter === "under-4") {
			return employee.data.rate < 4;
		} else {
			return true;
		}
	});
// Filter the data array based on search text
	const filteredSearch = data?.filter((employee) =>
		employee.data.name.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
			// Render the filtered employee rows inside the table body
		<>		
			<tbody>
				{/** Role render */}
				{currentFilterType === "role" &&
					!searchText.length &&
					(currentFilter !== "All"
						? filteredRole.map((employee) => {
								return <EmployeeRow employee={employee} setImpID={setImpID} key={employee.id}/>;
						  })
						: data?.map((employee) => {
								return <EmployeeRow employee={employee} setImpID={setImpID} key={employee.id}/>;
						  }))}
				{/** Salary render */}
				{currentFilterType === "salary" &&
					!searchText.length &&
					filteredRate.map((employee) => {
						return <EmployeeRow employee={employee} setImpID={setImpID} key={employee.id}/>;
					})}
				{/** Rate render */}
				{currentFilterType === "rate" &&
					!searchText.length &&
					filteredSalary.map((employee) => {
						return <EmployeeRow employee={employee} setImpID={setImpID} key={employee.id}/>;
					})}
				{/** Search render */}
				{searchText.length > 0 &&
					filteredSearch.map((employee) => {
						return <EmployeeRow employee={employee} setImpID={setImpID} key={employee.id}/>;
					})}
			</tbody>
		</>
	);
};

export default TableBody;
