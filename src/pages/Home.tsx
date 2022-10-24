import { useEffect, useState } from "react";
import { Food } from "./SingleRestaurantPage";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import dinner from "../assets/dinner.png"
import { Navigation } from "../components/Navigation";

import { User } from "../App";




export type Restaurant = {
  Foods: any;
  id: number;
  name: string;
  address: string;
  image: string;
  logo: string;
  openTime: string;
  userId: number;
  foods: Food[]
}

export function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [current, setCurrent] = useState(0);
  const length = restaurants.length;
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    fetch("http://localhost:3456/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="home">

      <Navigation />
      {/* <div className="home-top-section">
        <div className="home-text">
          <p className="p1">Are you hungry?</p>
          <p className="p2">Don't wait!</p>
          <p className="p3">Lets start to order food now</p>
          <form className="product_search_form">

          

          </form>
        </div>
      </div> */}



      <ul className="restaurant-list">
        <BsArrowLeftCircle className="leftArrow" onClick={prevSlide} />
        <BsArrowRightCircle className="rightArrow" onClick={nextSlide} />
        {restaurants.map((restaurant, index) => (
          <li
            className={index === current ? "slide active " : "slide "}
            key={restaurant.id}
          >
            {index == current && (
              <div className="restaurants">
                <Link to={`/restaurants/${restaurant.id}`}>

                  <div className="restaurant_image" style={{ backgroundImage: `url(${restaurant.image})`, backgroundRepeat: "no-repeat", height: 200, width: 700, backgroundPosition: "center", backgroundSize: "cover", backgroundBlendMode: "darken" }}>
                    <span className="restaurant_inimage">
                      <img className="restaurant_logo" src={restaurant.logo} width={60} alt="" />
                      <div className="line"></div>
                      <div className="restaurant_name">{restaurant.name}
                      </div>
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

