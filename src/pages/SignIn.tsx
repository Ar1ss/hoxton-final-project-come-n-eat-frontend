import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { User } from "../App";

type Props = {
  user: User | null ;
  setUser: React.Dispatch<React.SetStateAction<null | User >>;
};

export type EventTarget = {
  email: string;
  name: string;
  password: string;
};



export function SignIn({user,setUser}:Props){
    // const [user, setUser] = useState<null | User>();
    const [errors,setErrors]=useState("")

    return (
      <div className="signup">
        <div className="signupForm">
          {user ? <h2>Welcome {user.name}</h2> : <h2>Please sign in!</h2>}
          <form
            className="formSignup"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:3456/sign-in", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  email: e.target.email.value,
                  password: e.target.password.value,
                }),
              })
                .then((res) => res.json())
                .then((userData) => {
                  if (userData.error) {
                    setErrors(userData.error);
                  } else {
                    setUser(userData.user);
                    localStorage.token = userData.token;
                  }
                });
            }}
          >
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button
            onClick={
              ()=>{
                user ? (window.location.href = "/home") : <p></p>;
              }
            }
            >Sign in</button>
            
            {errors ? <p className="error">{errors}</p> : <p></p>}
            <h3>Don't have an account? </h3>
            
            <Link className="signup_button" to={"/signup"}>Sign up</Link>
          </form>
        </div>
      </div>
    );
}