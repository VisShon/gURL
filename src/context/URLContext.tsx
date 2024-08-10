// #region Imports
import { 
    createContext, 
    ReactNode,
    useState,
    useEffect,
} from "react";

import { getTopURLs, SHORT_URL } from "@/lib/url";
import axios from "axios";
// #endregion

export const URLsContext = createContext({} as {
    urls: SHORT_URL[]|[],
    create: (full_url:string) => Promise<string|void>,
    update: (id:number,new_url:string) => void,
    destroy: (id:number) => void,
});

export function URLsProvider({ children }: {
    children: ReactNode
}) {

    const [urls,setUrls] = useState<SHORT_URL[]>([])

    const create = async (full_url:string) => {
        try{
            const res = await axios.post("http://localhost:3000/short_urls",{
                full_url
            })

            const {data,error} = await getTopURLs()
            setUrls(data)

            if(res?.data?.short_code)
                return res?.data?.short_code

            alert(`An error occured ${res?.data?.errors}`)
        }
        catch(err){
            alert(`An error occured ${err}`)
        }
    }

    const update = async(id:number,new_url:string) => {

        try{
            const res = await axios.patch(`http://localhost:3000/short_urls/${id}`,{
                new_url
            })

            const {data,error} = await getTopURLs()
            setUrls(data)

        }
        catch(err){
            alert(`An error occured ${err}`)
        }
        
    }

    const destroy = async (id:number) => {
        try{
            const res = await axios.delete(`http://localhost:3000/short_urls/${id}`)
            const {data,error} = await getTopURLs()
            setUrls(data)
        }
        catch(err){
            alert(`An error occured ${err}`)
        }
    }

    useEffect(()=>{
        (async()=>{
            const {data,error} = await getTopURLs()
            setUrls(data)
        })()
    },[])

    return (
        <URLsContext.Provider value={{
            urls:urls,
            create,
            update,
            destroy,
        }}>
            {children}
        </URLsContext.Provider>
    );
}

