import {AddPost, FullPost, Home, Login, Registration} from "./pages/index.js";

export const routes = [
    {path: '/', element: <Home/>},
    {path: '/posts/:id', element: <FullPost/>},
    {path: '/add-post', element: <AddPost/>},
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Registration/>},
]