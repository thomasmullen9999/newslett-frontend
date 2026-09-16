import './App.css'
import Header from '../components/Header'
import ArticlesList from '../components/ArticlesList'
import Home from '../components/Home'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Routes, Route } from 'react-router-dom';
import SingleArticle from '../components/SingleArticle'
import { useState } from 'react'
import { UserContext } from '../contexts/User'
import ErrorPage from '../components/ErrorPage'
import UsersList from '../components/UsersList'
import TopicsList from '../components/TopicsList'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(  {
    username: "spidey_parker",
    name: "Peter Parker",
    avatar_url: "https://robohash.org/spidey_parker.png?set=set1",
  },)

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
    <div id="app">
      <Header/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:id" element={<SingleArticle />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </div>
    </UserContext.Provider>
  )
}

export default App
