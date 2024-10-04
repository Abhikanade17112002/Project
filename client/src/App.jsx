import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/shared/Layout/Layout'
import SignUp from './components/shared/SignUp/SignUp'
import SignIn from './components/shared/SignIn/SignIn'
import AuthLayout from './components/shared/Layout/AuthLayout'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
  },{
    path:"/auth",
    element: <AuthLayout/>,
    children:[{
      path:"signin",
      element: <SignIn/>,
    },{
      path:"signup",
      element: <SignUp/>,
    }]
  }
])
function App() {


  return (
    <>
      
      <RouterProvider router={router}/>
    </>
  )
}

export default App
