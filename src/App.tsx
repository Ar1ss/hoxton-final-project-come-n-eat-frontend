import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { SingleRestaurantPage } from './pages/SingleRestaurantPage'
import { Header } from './components/Header'
import { Restaurants } from './pages/Restaurants'
import { Profile } from './pages/Profile'


export type Restaurant = {
  id: number;
  name: string;
  address: string;
  image: string;
  logo: string;
  openTime : string;
  userId: number;
}

export type User = {
  email: string;
  name: string;
  password: string;
  id:number
  restaurants:Restaurant[]
};


function App() {
  const [user, setUser] = useState<null | User>(null);
  console.log("this is app",user)

  useEffect(()=>{
    if(localStorage.token){
      fetch("http://localhost:3456/validate",{
        headers:{
          "Authorization":localStorage.token
        }
      }).then(resp=>resp.json())
      .then(info=>{
        if(info.error){
          alert(info.error)
        }else{
          setUser(info.user)
          localStorage.token=info.token
        }
      })
    }
  },[])

  
  return (
    <div className="App">
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route
          path="/signin"
          element={<SignIn user={user} setUser={setUser} />}
        />
        <Route path='/restaurants' element = {<Restaurants/>}/>
        <Route path="/restaurants/:id" element={<SingleRestaurantPage user={user} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
      </Routes>

    </div>
  )
}

export default App
