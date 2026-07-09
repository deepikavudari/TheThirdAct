import Home from "./pages/Home"
import RenderSignup from "./pages/Signup"
import Login from "./pages/Login";
import {Routes, Route} from 
'react-router-dom';
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import Search from "./components/Search";
import SearchedMovies from "./pages/SearchedMovies";
import CreateList from "./components/CreateList";
import Profile from "./pages/Profile";
import ListInfo from "./pages/ListInfo";
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App(){
  return(
      <>
      <NavBar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/signup" element = {<RenderSignup/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/movies/:movie_id" element={ <MovieDetails/>} />
        <Route path="/search" element= {<Search/>}/>
        <Route path="/search/:query" element = {<SearchedMovies />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createList" element={<CreateList/>}/>
        <Route path="/profile/:listId" element={<ListInfo/>}/>
      </Routes>
      <SpeedInsights />
      </>
    
  )
}



