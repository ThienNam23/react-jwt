import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/">
          <Route path='' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='*' element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          } />
        </Route>
      </Routes>
      <Outlet />
    </Router>
  );
}

export default App;
