import Container from "@mui/material/Container";

import Header from "./components/Header/index.jsx";
import {Home} from "./pages/index.js";

const App = () => {
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Home />
            </Container>
        </>
    );
};

export default App;