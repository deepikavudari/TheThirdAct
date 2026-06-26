import GetMovies from "./pages/Home"
import RenderSignup from "./pages/Signup"
import Login from "./pages/Login";
import {Routes, Route} from 'react-router-dom';

export default function App(){
  return(
    <Routes>
    {/* <GetMovies/> */}
      <Route path="/" element = {<GetMovies/>} />
      <Route path="/signup" element = {<RenderSignup/>} />
      <Route path="/login" element = {<Login/>} />
    </Routes>
  )
}



