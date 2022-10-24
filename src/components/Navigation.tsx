import { Link } from "react-router-dom";
import orders from "../assets/hamburger-menu-svgrepo-com.svg"
import restaurant from "../assets/chef-hat.svg"
import cart from "../assets/cart-svgrepo-com.svg"
import profile from "../assets/user.svg"
import home from "../assets/home.svg"
import bird from "../assets/bird.svg"

export function Navigation (){
    return(
        <div className="nav-links">
          <div>
          <img width={40} src={bird} alt="" />
          <h3>Come`n eat</h3>
          </div>
          <Link to= "/home">
            <img width={40} src={home} alt="home" />
          <h3>Home</h3>
          </Link>
          <Link to="/restaurants"><img src={restaurant} width={40} alt="" />
          <h3>Restaurants</h3>
          </Link>
          <Link to="/profile"><img width={40} src={profile} alt="" />
            <h3>Profile</h3>
          </Link>
        </div>
    )
}