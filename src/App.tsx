// #region Imports
import SearchDialog from "./components/SearchDialog"
import { SHORT_URL } from "./lib/url"
import URLCard from "./components/URLCard"
import { useContext, useEffect, useState } from "react"
import { URLsContext } from "./context/URLContext"
import VerticalPanel from "./components/VerticalPanel"
// #endregion

export default function Home() {
    const {urls} = useContext(URLsContext)
    const [mod,setMod] = useState<string>("Ctrl")

    useEffect(()=>{
		if( 
			typeof window !== "undefined" 
			? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
			:false
		) setMod("⌘")

	},[navigator.userAgent])

	return (
		<>
			<main className="w-screen flex flex-col items-center justify-center p-8 ">
				<SearchDialog
					open={false}
					users={[]}
                    mod={mod}
				/>
                
                <h1 className="mt-[10%] font-bold text-grey-dark font-nunito text-6xl">Top URLS</h1>
                <p className="mb-[5%] mt-4 font-medium text-grey-dark font-nunito">Press {mod} + U for local urls</p>


                <section className="grid grid-cols-4 gap-10 z-0 ">
                    {urls?.map((url:SHORT_URL,i:number)=>
                        <URLCard
                            key={i}
                            id={url.id}
                            updated_at={url.updated_at}
                            created_at={url.created_at}
                            title={url.title}
                            full_url={url.full_url}
                            counter={url.click_count}
                        />
                    )}
                </section>

                <VerticalPanel/>
			</main>
		</>
	)
}