import { Link, useNavigate } from "react-router-dom";
import { User } from "../App";
import fastfood from "../assets/fast-food-svgrepo-com.svg";
import orders from "../assets/hamburger-menu-svgrepo-com.svg"
import restaurant from "../assets/restaurant-plate-svgrepo-com.svg"
import cart from "../assets/cart-svgrepo-com.svg"
import profile from "../assets/profile-svgrepo-com.svg"
import logo from "../assets/restaurant-svgrepo-com.svg"



type Props = {
    setUser : React.Dispatch<React.SetStateAction<User | null >>;
    user : User | null ;
}


export function Header ({user,setUser}:Props) {
    const navigate = useNavigate();
    return (

        <div className="header">
            <div className="headerLeft">
            <img src={logo} width={60} alt="" />
                <h1>Come`n Eat</h1>
                
            </div>
            <div className="headerRight">
                <div className="headerButtons">
                <nav>
       
      </nav>
                </div>
            </div>
        </div>
    )
}

 