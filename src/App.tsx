import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./main";
import { DoneLogin, NotLogin, removeUser, setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Signup = lazy(() => import("./components/Signup"));
const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));

const App = () => {
  const dispatch = useDispatch();
  const { Authenticated } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );
  useEffect(() => {
    axios
      .get(`${server}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(DoneLogin());
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(NotLogin());
        dispatch(removeUser());
      });
  }, [Authenticated]);
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
