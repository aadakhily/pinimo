import { useState, useEffect } from 'react'

import fetchApi  from '../utils/fetchApi'

function useFetch(options) {
    const [data, setData] = useState()
    const [loading, setloading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setloading(true)
            const { data:res } = await fetchApi(options)
            setData(res)

            console.log(data);
        } catch (err) {
            console.error(err)
        } finally {
            setloading(false)
        }
    }
    return { data, loading , fetchData }
}

export default useFetch