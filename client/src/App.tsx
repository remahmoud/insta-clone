import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Auth, Home } from "@pages/index";
import PrivateRoute from "@components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route index path="/" element={<Home />} />
                </Route>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
