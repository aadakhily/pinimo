import DefaultLayout from '../../layouts/default'
import SearchHeader from '../../components/SearchHeader'
import PostList from '../../components/PostList'
const Home = () => {
  return (
    <DefaultLayout>
      <SearchHeader />
      <PostList />
    </DefaultLayout>
  )
}

export default Home