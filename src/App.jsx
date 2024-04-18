import Container from "@mui/material/Container";

import Header from "./components/Header/index.jsx";
import {Route, Routes} from "react-router-dom";
import {AddPost, FullPost, Home, Login, Registration} from "./pages/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth.js";
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