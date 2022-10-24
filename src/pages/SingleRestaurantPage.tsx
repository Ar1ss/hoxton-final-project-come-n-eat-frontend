import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "./Home";
import location from "../assets/location-svgrepo-com.svg"
import search from "../assets/search-svgrepo-com.svg"
import { Header } from "../components/Header";
import { User } from "../App";
import { Navigation } from "../components/Navigation";

type Props = {
    user: User | null;
}


export type Food = {
    userId: number;
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image: string;
    restaurantId: number;

}



export function SingleRestaurantPage({ user }: Props) {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [food, setFood] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3456/restaurants/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setRestaurant(data);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3456/foods`)
            .then((res) => res.json())
            .then((food) => {
                setFood(food);
            });
    }, []);

   //make a function to refresh the page but not reload it
    function refreshPage() {
        window.location.reload(false);
    }



    return (
        

        <div className="single_restaurant-section">
            
            
            <div className="single_restaurant">

                    <div className="navigation">
                        <Navigation />
                    </div>

                {restaurant && (
                    <div className="restaurant">
                        <div className="restaurant_info">
                            <div className="restaurant_img_sections">
                                <img className="restaurant__logo" width={80} src={restaurant.logo} alt="" />
                            </div>
                            <div className="restaurant__info">

                                <div className="restaurant_info_address">
                                    <img width={15} src={location} alt="" />
                                    {restaurant.address}</div>
                                <div className="restaurant_info_openTime">{restaurant.openTime}</div>

                            </div>
                        </div>

                        <form className="product_search_form">


                            <button className="product_search_button" ><img width={25} src={search} alt="" /></button>
                            <input className="product_search" type="text" placeholder="Search your product"
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                }} />


                        </form>
                        <div className="food">
                            {restaurant.Foods.filter((val: { name: string; }) => {
                                if (searchTerm === "") {
                                    return val;
                                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).map((food: Food) => (

                                <div className="food_section" key={food.id}>
                                    <img className="food_image" width={200} src={food.image} alt="" />
                                    <div className="food__info">

                                        <div className="food_name-description">
                                            <div className="food__info_name"><h3>{food.name}</h3></div>
                                            <div className="food__info_description">{food.description}</div>
                                        </div>


                                        <div className="food__info_price"><h2>{food.price} EUR</h2></div>

                                        <button  className="buy_button"
                                            
                                            onClick={() => {
                                                refreshPage();
                                                fetch(`http://localhost:3456/foods/${food.id}`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        userId: user?.id,
                                                    }),
                                                })
                                                    .then((res) => res.json())
                                                    .then(() => {
                                                        fetch(`http://localhost:3456/foods/${food.id}`)
                                                            .then((resp) => resp.json())
                                                            .then((food) => setFood(food));
                                                    });
                                            }}
                                        >
                                            Add to cart
                                        </button>
                                        {food.userId == user?.id ? (
                                            <p className="purchaseNotification">Purchase successful</p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}