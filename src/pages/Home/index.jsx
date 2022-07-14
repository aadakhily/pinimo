import { useEffect, useState } from 'react'
import PinsList from '@/components/PinsList'
import DefaultLayout from '@/layouts/default'
import SearchHeader from '@/components/SearchHeader'
import fetchApi from '@/utils/fetchApi'

const Home = () => {
  const [pins, setPins] = useState([])
  const [searchInput , setSearchInput] = useState('')

  async function fetchPins() {
    try {
      const { data } = await fetchApi.get('/pins',{
        params:{
          q: searchInput
        }
      })

      setPins(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { fetchPins() }, [searchInput])

  return (
    <DefaultLayout>
      <SearchHeader onSearch={setSearchInput} value={searchInput} />
      <PinsList pins={pins} />
    </DefaultLayout>
  )
}

export default Home