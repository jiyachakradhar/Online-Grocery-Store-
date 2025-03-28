import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/feature/user";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useToggle } from "../../hooks/useToggle";
import SignInForm from "../modal/SignInForm";
import LoginForm from "../modal/LoginForm";
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [isModalOpen, toggleModal] = useToggle({ initialValue: false });
  const [isLoginOpen, toggleLogin] = useToggle({ initialValue: false });
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search/${value}`);
    setValue("");
  };

  const slug = loggedIn
    ? [
        {
          element: (
            <Link to="/" key={"Home"} className="text-xl">
              Home
            </Link>
          ),
        },
        {
          element: (
            <Link to="/Cart" key={"Cart"}>
              <IoMdCart className="h-7 w-10" />
            </Link>
          ),
        },
        {
          element: (
            <Link to="/Setting" key={"Settings"} className="text-xl">
              Setting
            </Link>
          ),
        },
      ]
    : [
        {
          element: (
            <Link to="/" key={"Home"} className="text-xl">
              Home
            </Link>
          ),
        },
        {
          element: (
            <Link to="/Cart" key={"Cart"}>
              <IoMdCart className="h-7 w-10" />
            </Link>
          ),
        },
        {
          element: (
            <div key={"SignUp"}>
              <button onClick={toggleModal} className="text-xl">
                Signup
              </button>
              <SignInForm isOpen={isModalOpen} toggle={toggleModal} />
            </div>
          ),
        },
        {
          element: (
            <div key={"Login"}>
              <button onClick={toggleLogin} className="text-xl">
                Login
              </button>
              <LoginForm isOpen={isLoginOpen} toggle={toggleLogin} />
            </div>
          ),
        },
      ];
  return (
    <nav className="flex justify-between items-center w-full px-4 h-10 shadow-md select-none">
      <div className="flex items-center mb-3">
        <FaShoppingBasket className="text-green-600 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-green-600">Easy Basket</h2>
      </div>
      <ul className="flex gap-4 items-center">
        <div className="border border-black px-2 rounded-lg">
          <input
            type="text"
            className="bg-transparent outline-none w-40"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button onClick={() => handleSubmit()}>
            <CiSearch />
          </button>
        </div>

        {slug.map((item) => item.element)}
      </ul>
    </nav>
  );
};

export default Navbar;
