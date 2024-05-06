import Container from "@mui/material/Container";

import Header from "./components/Header/index.jsx";
import {Route, Routes} from "react-router-dom";
import {AddPost, FullPost, Home, Login, Registration} from "./pages/index.js";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/auth.js";
import Profile from "./pages/Profile/Index.jsx";
// import {routes} from "./route.js";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, []);

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    {/*{routes*/}
                    {/*    .map(({path, element}) => (*/}
                    {/*            <Route key={path} path={path} element={element}/>*/}
                    {/*        )*/}
                    {/*    )}*/}
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/:id'} element={<Profile/>}/>
                    <Route path={'/tags/:tag'} element={<Home/>}/>
                    <Route path={'/posts/:id'} element={<FullPost/>}/>
                    <Route path={'/posts/:id/edit'} element={<AddPost/>}/>
                    <Route path={'/add-post'} element={<AddPost/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default App;