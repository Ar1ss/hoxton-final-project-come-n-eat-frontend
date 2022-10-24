import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { User } from "../App"
import { Navigation } from "../components/Navigation";
import { Food } from "./SingleRestaurantPage";

type Props = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};

export function Profile({ user, setUser }: Props) {
  const [foods, setFoods] = useState<Food[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3456/ownedFoods")
      .then(res => res.json())
      .then(data => {
        setFoods(data)
      })
  }, [])

  const owned = []
  for (let food of foods) {
    if (food.userId === user?.id) {
      owned.push(food)
    }
  }

  return (
    <div className="profile">

        <div className="navigation">
          <Navigation />
        </div>
      


      <div className="profile__info">
        
        <img className="profile_img" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
        <div className="profile__details">

          
          
            <h1>User Name</h1>
            <h3>{user?.name}</h3>
        <hr />

          
            <h1>User Email</h1>
            <h3>{user?.email}</h3>
          <hr />

        </div>
      </div>
      
      <div className="profile__owned">
        <div className="profile__owned__foods">
          {owned.map((food) => (
            <div className="profile__owned__food">
              <img className="owned_food_img" width={100} src={food.image} alt="" />
              <h3>{food.name}</h3>
              <h3>{food.price} EUR</h3>
              
            </div>
          ))}
          <h1>Total: {owned.reduce((acc, food) => acc + food.price, 0)} EUR</h1>
        </div>
        
        <div>
        </div>
      </div>
      <div className="profile__logout">
        <button  className="logout_button"
        onClick={() => {
          setUser(null)
          navigate("/signin")
        }}>Logout</button>
      </div>
    </div>


  );
}










