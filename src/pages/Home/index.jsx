import PostList from '../../components/PostList'
import DefaultLayout from '../../layouts/default'
import SearchHeader from '../../components/SearchHeader'
import fetchApi from '../../utils/fetchApi'
import { useEffect ,useState } from 'react'
const Home = () => {

  const [Pins, setPins] = useState([])

  async function fetchPins() {
    try {
      const { data } = await fetchApi.get('pins')

      console.log(data);
    } catch (error) {

    }
  }
  useEffect(() => { fetchPins() }, [])
  return (
    <DefaultLayout>
      <SearchHeader />
      <PostList />
    </DefaultLayout>
  )
}

export default Home