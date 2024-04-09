import Container from "@mui/material/Container";

import Header from "./components/Header/index.jsx";
import {Route, Routes} from "react-router-dom";
import {AddPost, FullPost, Home, Login, Registration} from "./pages/index.js";
// import {routes} from "./route.js";

const App = () => {
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
                    <Route path={'/add-post'} element={<AddPost/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default App;