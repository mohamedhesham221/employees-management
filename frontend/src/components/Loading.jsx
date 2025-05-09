const Loading = () => {
	return (
		<div className="w-full min-h-[100vh] bg-[var(--main-bg)] z-[999] absolute top-0 flex justify-center items-center">
			<span className="loading loading-bars loading-xl"></span>
		</div>
	);
};

export default Loading;
