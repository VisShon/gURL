// #region Imports
import { useShortcut } from "../../hooks/useShortcut"
import { useMouse } from "../../hooks/useMouse"

import { 
	useContext, 
	useState, 
	useEffect, 
	useRef 
} from "react"

import Backdrop from "./Backdrop"
import { URLsContext } from "../../context/URLContext"
// #endregion

export interface DialogParams {
	open?:boolean,
	users:any[],
    mod:string
}


function SearchDialog({open=false,users,mod}:DialogParams) {

	const {create} = useContext(URLsContext)

	const dialogRef = useRef<HTMLDialogElement>(null)
	
	const [isOpen,setIsOpen] = useState<boolean>(false)

    const [fullURL, setFullURL] = useState<string>("")
    const [shortURL, setShortURL] = useState<string>("")
    const searchElement = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (searchElement.current&&isOpen) {
			searchElement.current.focus()
		}
	}, [isOpen])

	useShortcut([
		["mod+K", () => setIsOpen(prev => !prev)],
		["Escape", () => {
			setIsOpen(false)
		}],
	])

	useMouse({
		combination:"mousedown", 
		handler: (e) => {
			if(!dialogRef.current?.contains(e.target as Node))
				setIsOpen(false)
		},
	})



	return (
		<>

			<dialog 
				ref={dialogRef}
				className="fixed w-[40em] top-32 bg-grey-dark  p-6 rounded-2xl my-16 text-chalk text-xl overflow-hidden animate-modal shadow-lg transition-all delay-150 ease-in-out z-10 h-max"
				open={open||isOpen}
			>

                <div
                    className="relative flex items-center gap-2  text-grey-light font-medium  z-10 text-[1.1rem] mb-6"
                >

                    <input 
                        className=" bg-chalk border-[2px] focus:outline-none clear-none p-4 w-full rounded-lg  border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100 "
                        value={fullURL}
                        ref={searchElement}
                        autoFocus
                        onChange={(e)=>setFullURL(e.target.value.toLowerCase())}
                        type="search"
                        placeholder={`Try typing "http://google.com"...`}
                    />
                            
                </div>

				<section className="flex gap-4 justify-between  transition-all delay-200 ease-in-out ">
		
                    <button
                        onClick={async()=>{
                            const code = await create(fullURL)
                            if (code) setShortURL(code)
                        }}
                        className="p-2 px-4 w-[20%] bg-blue-main hover:bg-blue-dark rounded-lg  font-bold text-[1rem] transition-all ease-in-out delay-50"
                    >
                        Shorten
                    </button>

					<Backdrop
                        short_url={shortURL}
                    />
					
				</section>

				
				
			</dialog>


			<div
				className="fixed left-8 top-8 select-none flex gap-5 bg-white p-2 px-4 w-[40%] min-w-fill rounded-xl text-[1rem] font-semibold text-grey-super-light cursor-pointer shadow font-nunito z-50"
			>

				<img
                    className="h-[3rem]"
					fetchPriority="high"
					src="/ltv.svg"
					alt="search"
				/>

				<button
					id="CommandPallete" 
					onClick={()=>setIsOpen(true)}
					className="p-3 py-1 w-[90%] flex items-center gap-2 rounded-lg bg-chalk border-[1px] active:border-[2px] active:shadow-md active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">
					
                    <img
                        className="h-[2rem]"
					 	fetchPriority="high"
						src="/search.svg"
						alt="search"
					/>

					<p>
						Type URL to shorten
					</p>
					
				</button>

				<button
					onClick={()=>setIsOpen(true)}
					className=" font-bold px-4 font-space text-xl flex items-center gap-2 rounded-lg bg-chalk active:border-[1px] active:shadow-lg active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">

					<p className="bg-concrete  px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">
						{mod}
					</p>+
					<p className="bg-concrete  px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">K</p>

				</button>
				
			</div>
		</>
	)
}


export default SearchDialog