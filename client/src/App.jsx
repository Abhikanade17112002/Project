import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout/Layout";
import SignUp from "./components/shared/SignUp/SignUp";
import SignIn from "./components/shared/SignIn/SignIn";
import AuthLayout from "./components/shared/Layout/AuthLayout";
import {
  getIsAuthenticated,
  getIsLoading,
  getUserInfo,
} from "./store/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./components/shared/HeroSection/HeroSection";
import CategoryCarousel from "./components/shared/CategoryCarousel/CategoryCarousel";
import LatestJobs from "./components/shared/LatestJobOpenings/LatestJobs";
import Jobs from "./components/shared/Jobs/Jobs";
import BrowseJobs from "./components/shared/BrowseJobs/BrowseJobs";
import UserProfile from "./components/shared/UserProfile.jsx/UserProfile";
import JobDetails from "./components/shared/JobDetails/JobDetails";
import { useEffect } from "react";
import { getAllJobs, getAllJobsAction } from "./store/jobSlice/jobSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <div className="w-full">
            <HeroSection></HeroSection>
            <CategoryCarousel></CategoryCarousel>
            <LatestJobs></LatestJobs>
          </div>
        ),
      },
    ],
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
  {
    path: "/jobs",
    element: <Layout></Layout>,
    children: [
      {
        path: "",
        element: <Jobs></Jobs>,
      },
      {
        path: "browse",
        element: <BrowseJobs></BrowseJobs>,
      },
      {
        path: "job/:id",
        element: <JobDetails></JobDetails>,
      },
    ],
  },
  {
    path: "/user",
    element: <Layout></Layout>,
    children: [
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch() ;
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getIsLoading);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    dispatch(getAllJobsAction());
  }, [dispatch, userInfo]);
  console.log(isAuthenticated, isLoading, userInfo, "hiiiiiii");

  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
