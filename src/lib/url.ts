
import axios from "axios"

export interface SHORT_URL {
	"id":number
	"short_code"?:string,
	"click_count": number,
	"full_url":string
	"title":string
	"updated_at":string
	"created_at":string
}

export const getTopURLs = async():
    Promise<{
		data:any,
		error:unknown|undefined,
		isPending:boolean,
	}>=>{

	let isPending = true

	try {

		let {data:short_urls} = await axios.get(`http://localhost:3000/`)
        let res = short_urls.urls?.map((item:SHORT_URL)=> {
            return {
                ...item,
                created_at:new Date(item.created_at).toLocaleDateString(),
                updated_at:new Date(item.updated_at).toLocaleDateString()
            }
        })

		return {
			data:res,
			error:undefined,
			isPending:false
		}
		
	}
	catch(error:unknown){
		console.log(error)
		return {
			data:undefined,
			error,
			isPending
		}
		
	}
}

export const encode = (n:number) => {
    const BASE62_CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (typeof n !== 'number' || n === null) return null
    if (n === 0) return '0'

    let shortAlias = ''

    while (n > 0) {
        shortAlias += BASE62_CHARACTERS[n % 62];
        n = Math.floor(n / 62);
    }

    return shortAlias.split('').reverse().join('');
}