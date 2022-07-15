import { useEffect, useState } from 'react'
import PinsList from '@/components/PinsList'
import DefaultLayout from '@/layouts/default'
import SearchHeader from '@/components/SearchHeader'
import fetchApi from '@/utils/fetchApi'

const Home = () => {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  async function fetchPins() {
    try {
      setLoading(true)
      const { data } = await fetchApi.get('/pins', {
        params: {
          q: searchInput
        }
      })

      setPins(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPins() }, [searchInput])

  return (
    <DefaultLayout>
      <SearchHeader onSearch={setSearchInput} value={searchInput} />
      <PinsList pins={pins} loading={loading} />
    </DefaultLayout>
  )
}

export default Home