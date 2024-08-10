// #region Imports
import SearchDialog from "./components/SearchDialog"
import { SHORT_URL } from "./lib/url"
import URLCard from "./components/URLCard"
import { useContext } from "react"
import { URLsContext } from "./context/URLContext"
// #endregion

export default function Home() {
    const {urls} = useContext(URLsContext)

	return (
		<>
			<main className="w-screen flex  p-8 ">
				<SearchDialog
					open={false}
					users={[]}
				/>
                <section className="grid grid-cols-6 gap-10 z-0 pt-[10%]">
                    {urls?.map((url:SHORT_URL,i:number)=>
                        <>
                            <URLCard
                                key={i}
                                id={url.id}
                                updated_at={url.updated_at}
                                created_at={url.created_at}
                                title={url.title}
                                full_url={url.full_url}
                                counter={url.click_count}
                            />
                        </>
                    )}
                </section>
			</main>
		</>
	)
}


