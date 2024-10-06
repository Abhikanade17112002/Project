import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout/Layout";
import SignUp from "./components/shared/SignUp/SignUp";
import SignIn from "./components/shared/SignIn/SignIn";
import AuthLayout from "./components/shared/Layout/AuthLayout";
import { getIsAuthenticated, getIsLoading, getUserInfo } from "./store/userSlice/userSlice";
import { useSelector } from "react-redux";
import HeroSection from "./components/shared/HeroSection/HeroSection";
import CategoryCarousel from "./components/shared/CategoryCarousel/CategoryCarousel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[{
      path: "/",
      element:     <div className="w-full">
        <HeroSection></HeroSection>
       < CategoryCarousel></CategoryCarousel>
        
      </div>    ,
    }]
    ,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
function App() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getIsLoading);
  const userInfo = useSelector(getUserInfo);
  console.log(isAuthenticated, isLoading, userInfo);
  
  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
