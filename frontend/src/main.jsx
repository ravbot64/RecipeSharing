import React,{useContext} from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/AuthContext'
import './index.css'
import { Signup,Login, Home,AddRecipe,About, RecipeDetails, UserProfile} from './components'
import { MantineProvider } from '@mantine/core';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>q
      <Route path = "" element = {<Home/>} />
      <Route path = "/addRecipe" element = {<AddRecipe/>} />
      <Route path = "/about" element = {<About/>} />
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/signup" element = {<Signup/>} />
      <Route path="/profile/:userId" element={<UserProfile />} /> 
      <Route path='recipeDetails/:recipeId' element={<RecipeDetails   />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <MantineProvider>
  <RouterProvider router = {router} />
  </MantineProvider>
  </AuthContextProvider>
)
