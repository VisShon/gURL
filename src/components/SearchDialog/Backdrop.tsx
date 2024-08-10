function Backdrop(
    {short_url}:
    {short_url:string}
) {
	return(
		<>
			<div className="flex ml-4 flex-col w-[76%] z-10 gap-4 text-chalk text-[1.1rem] font-normal selection-none transition delay-200 ease-in-out">

				<button 
                    className="flex items-center gap-3 bg-grey-dark p-2 rounded-lg w-[100%]  border-2 border-grey-light shadow-md text-left "
                    onClick={(e)=>{
                        e.preventDefault()
                        navigator?.clipboard.writeText("http://localhost:3000/"+short_url)
                        alert("Copied to clipboard!")
                    }} 
                >
					<img
						className="rounded-full bg-charcoal w-[3rem] h-[3rem] p-3"
						src="/bulb.svg"
						alt="suggestion"
					/>
                    {
                        short_url?
                        <p className="w-[85%] text-[1.1rem]">
                            Press to copy: {"localhost:3000/"+short_url}
                        </p>:
                        <p className="w-[85%] text-[1.1rem]">
                            Just Type or Copy pase URLs to get a short url
                        </p>
                    }
				</button>
				
			</div>

		
			<img
				className="absolute object-cover right-0 bottom-0 -z-10 h-full w-[40%] "
				src="/command-search-bg.svg"
				fetchPriority="high"
				alt="command-search-bg"
			/>

		</>
	)
}

export default Backdrop