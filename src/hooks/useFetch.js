import { useState, useEffect } from 'react'

import axiosInstanse  from '../utils/axiosInstanse'

function useFetch(options) {
    const [data, setData] = useState()
    const [loading, setloading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setloading(true)
            const { data:res } = await axiosInstanse(options)
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