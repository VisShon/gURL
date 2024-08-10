import { FaUsers } from "react-icons/fa"
import { encode } from "../lib/url"
import { useContext } from "react"
import { URLsContext } from "../context/URLContext"


export default function NameCard({
    id,
	updated_at,
	created_at,
	title,
	full_url,
	counter,
}:{
	updated_at:string|null,
	created_at:string|null,
	full_url:string|null,
	title:string|null,
	counter:number|null,
	id:number|null,
}) {

    const {destroy} = useContext(URLsContext)

	return (
        <>
            <div 
                onClick={(e)=>{
                    e.preventDefault()
                    navigator?.clipboard.writeText("http://localhost:3000/"+encode(id!))
                    alert("Copied to clipboard!")
                }} 
                title="copy to clipboard"
                className="bg-white rounded-lg border-2 p-6 w-full h-[25vh] flex flex-col justify-between items-center cursor-pointer  select-none relative group"
            >

                <button 
                    className="absolute -top-2 -left-2 z-20 rounded-full p-2 w-[1.8rem] h-[1.8rem] text-[0.75rem] bg-white border-2 border-slate-200 animate-modal hidden hover:shadow-md group-hover:flex items-center duration-200 trasition-all ease-in-out" 
                    onClick={(e)=>{
                        destroy(id!)
                        e.stopPropagation();
                    }}
                    >
                        X
                </button>

                <div className="text-center mx-4 bg-slate-100 rounded-full h-[4rem] w-[4rem] p-2 flex flex-col gap-1  justify-center items-center absolute -top-6 border-2">
                    <>
                        <FaUsers className="inline-block text-gray-700" />						
                        <p className="text-gray-700 font-semibold text-[0.85rem]">{counter}</p>
                    </>
                </div>

                <div className="text-center mt-6">
                    {title && <h2 className="text-3xl font-semibold text-gray-800">{title.slice(0,10)}</h2>}
                    {full_url && <h2 className="text-sm font-medium text-blue-light">{full_url.slice(8,30)}</h2>}

                    {created_at && <p className=" text-sm text-gray-500 mt-4">created on {created_at}</p>}
                    {updated_at && <p className=" text-sm text-gray-500">updated on {updated_at}</p>}
                </div>
            </div>
        </>
	)
};
