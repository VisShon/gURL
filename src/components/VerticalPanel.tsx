// #region Imports
import { useShortcut } from "@/hooks/useShortcut"
import {useState} from "react"
// #endregion

function VerticalPanel() {

	const [show,setShow] = useState<boolean>(false)

	const [localURLs,setLocalURLs] = useState<{
        short_code:string,
        full_url:string
    }[]>([])

	useShortcut([
		["mod+S", () => {
			setShow(true)
			const res = JSON.parse(localStorage.getItem('local_urls')!)
			setLocalURLs(res)
		}],
	])

	return (
		<>
			
			{
				show&&
				<div className="fixed right-8 top-10 p-2 select-none flex flex-col items-center gap-5 bg-white min-w-[5em] h-[92%] min-h-fill rounded-xl text-[0.85rem] font-semibold text-grey-super-light cursor-pointer shadow font-nunito group animate-modal z-10 ">
					<button 
						className="absolute -top-2 -left-2 z-20 rounded-full p-2 w-[1.8rem] h-[1.8rem] text-[0.75rem] bg-white border-2 border-slate-200 animate-modal hidden hover:shadow-md group-hover:flex items-center duration-200 trasition-all ease-in-out" 
						onClick={()=>setShow(prev=>!prev)}
						>
							X
					</button>


					<div className=" flex flex-col overflow-y-scroll gap-2">
						{
							localURLs?.map((url,id)=><>
                                <button 
                                    key={id}
                                    title= "click to copy"
                                    className="bg-white rounded-lg border-2 p-6 min-w-max flex flex-col justify-between items-center cursor-pointer  select-none relative"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        navigator?.clipboard.writeText("http://localhost:3000/"+url?.short_code)
                                        alert("Copied to clipboard!")
                                    }} 
                                >
                                    <p className="text-[0.8rem] font-medium text-blue-light">{url?.full_url.slice(8,20)}</p>
                                    <span className="text-[0.7rem] text-gray-500 mt-4">{"localhost:3000/"+url.short_code?.slice(0,10)}</span>
                                </button>
                            </>)
						}
					</div>
					
				</div>
			}
		</>
	)
}

export default VerticalPanel