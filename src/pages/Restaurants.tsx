import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Food } from "./SingleRestaurantPage";
import search from "../assets/search-svgrepo-com.svg"
import bike from "../assets/bike.svg"
import whitebike from "../assets/white-bike.png"

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

export function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3456/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  return (
    <div className="restaurants_section">
      <header className="restaurants-header">
        <h1>Restaurants</h1>
        <form className="product_search_form">

          {/* search for products */}

          <button className="product_search_button" ><img width={25} src={search} alt="" /></button>
          <input className="product_search" type="text" placeholder="Search restaurant" 
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}/>
          


        </form>
      </header>
      <div className="restaurants">
        {restaurants.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        }).map((restaurant) => (
        

          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="restaurant" key={restaurant.id}>
              <div className="restaurant_img_sections">
                <div className="restaurant_image" style={{ backgroundImage: `url(${restaurant.image})`, backgroundRepeat: "no-repeat", height: 200, width: 1000, backgroundPosition: "center", backgroundSize: "cover", backgroundBlendMode: "darken" }}>
                  <div className="restaurant_name">{restaurant.name}</div>
                </div>
              </div>

            <div className="restaurants-info-opentime">
              <div> Open Time : {restaurant.openTime}</div>
              <div><img width={20} src={whitebike} alt="" /></div>
              </div>
            </div>
          </Link>
            

        ))}
      </div>
    </div>
  )
}

