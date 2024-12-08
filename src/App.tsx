//import "./App.css";

import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/logIn/Login";
import RequiredAuth from "./pages/auth/RequiredAuth";
import Counter from "./pages/counter/Counter";
import LoginLink from "./pages/logIn/LoginLink";
import Protected from "./pages/protected/Protected";

function App() {
  return (
    <div className="">
      <div className="p-4 border rounded shadow">
        <p>Navigation</p>
        <nav>
          <ul className="flex gap-2">
            <li>
              <LoginLink />
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-700" : "text-black"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/counter"
                end
                className={({ isActive }) =>
                  isActive ? "text-red-700" : "text-black"
                }
              >
                Counter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/protected"
                end
                className={({ isActive }) =>
                  isActive ? "text-red-700" : "text-black"
                }
              >
                Protected
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/counter" element={<RequiredAuth />}>
          <Route index element={<Counter />}></Route>
        </Route>
        <Route path="/protected" element={<RequiredAuth />}>
          <Route index element={<Protected />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
