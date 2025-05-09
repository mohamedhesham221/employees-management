import * as React from "react";

const Pagination = ({currentPage,setCurrentPage, totalPages}) => {
	const pages = new Array(totalPages).fill().map((_, i) => i + 1)
	
	return (
		<>
			<div className="join ">
				{pages.map((page, index) => {					
					return (
						<button
							className={`join-item btn  bg-white ${
								page === currentPage ? "btn-active" : ""
							} text-[var(--text-color)]`}
							key={index}
							onClick={() => setCurrentPage(page)}
						>
							{page}
						</button>
					);
				})}
			</div>
		</>
	);
};

export default Pagination;
