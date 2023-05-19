import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Auth, Home, PostDetail } from "@pages/index";
import PrivateRoute from "@components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route index path="/" element={<Home />} />
                    <Route index path="/post/:id" element={<PostDetail />} />
                </Route>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
