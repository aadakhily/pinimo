import PostList from '../../components/PostList'
import DefaultLayout from '../../layouts/default'
import SearchHeader from '../../components/SearchHeader'

const Home = () => {
  return (
    <DefaultLayout>
      <SearchHeader />
      <PostList />
    </DefaultLayout>
  )
}

export default Home