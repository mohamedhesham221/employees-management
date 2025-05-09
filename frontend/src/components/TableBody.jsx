import * as React from "react";
import EmployeRow from "./EmployeRow";

const TableBody = ({
	data,
	setImpID,
	currentFilter,
	currentFilterType,
	searchText,
}) => {
	// Filter the data array based on role select
	const filteredRole = data?.filter(
		(employe) => employe.data.role === currentFilter
	);
// Filter the data array based on rate select
	const filteredRate = data?.filter((employe) => {
		if (currentFilter === "above-$5000") {
			return employe.data.salary >= 5000;
		} else if (currentFilter === "under-$5000") {
			return employe.data.salary < 5000;
		} else {
			return true;
		}
	});
// Filter the data array based on salary range select
	const filteredSalary = data?.filter((employe) => {
		if (currentFilter === "above-4") {
			return employe.data.rate >= 4;
		} else if (currentFilter === "under-4") {
			return employe.data.rate < 4;
		} else {
			return true;
		}
	});
// Filter the data array based on search text
	const filteredSearch = data?.filter((employe) =>
		employe.data.name.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
			// Render the filtered employe rows inside the table body
		<>		
			<tbody>
				{/** Role render */}
				{currentFilterType === "role" &&
					!searchText.length &&
					(currentFilter !== "All"
						? filteredRole.map((employe) => {
								return <EmployeRow employe={employe} setImpID={setImpID} key={employe.id}/>;
						  })
						: data?.map((employe) => {
								return <EmployeRow employe={employe} setImpID={setImpID} key={employe.id}/>;
						  }))}
				{/** Salary render */}
				{currentFilterType === "salary" &&
					!searchText.length &&
					filteredRate.map((employe) => {
						return <EmployeRow employe={employe} setImpID={setImpID} key={employe.id}/>;
					})}
				{/** Rate render */}
				{currentFilterType === "rate" &&
					!searchText.length &&
					filteredSalary.map((employe) => {
						return <EmployeRow employe={employe} setImpID={setImpID} key={employe.id}/>;
					})}
				{/** Search render */}
				{searchText.length > 0 &&
					filteredSearch.map((employe) => {
						return <EmployeRow employe={employe} setImpID={setImpID} key={employe.id}/>;
					})}
			</tbody>
		</>
	);
};

export default TableBody;
