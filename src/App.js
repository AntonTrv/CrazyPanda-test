import './App.css';
import axios from "axios";
import {useState, useEffect} from 'react';
import Posts from "./components/Post";
import Pagination from "./components/Pagination";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [filteredByBody, setFilteredByBody] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, []);


  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredByBody ? filteredByBody : posts.slice(indexOfFirstPost, indexOfLastPost);

  //filterByBody
  const filteredData = (e) => {
    e ?
    setFilteredByBody(posts.filter(post => post.body.includes(e))) : setFilteredByBody('')
  }

  //paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if(loading) {
    return (
        <div className="spinner"></div>
    )
  };

  return (
    <div className="App">
      <div className="bar_wrapper">
        <label htmlFor="filter">Filter by body:</label>
        <input type="text" id="filter" name="filter" onChange={(e) => filteredData(e.target.value)}/>
      </div>
      <Posts posts={currentPosts} loading={loading}/>
      {filteredByBody ? null : <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} paginate={paginate}/>}
    </div>
  );
}

export default App;
