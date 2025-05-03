import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import "./App.css";
import { countPeriod, separateArraysForChart } from "./constants/index.jsx";
import ChartsPage from "./pages/ChartsPage";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import TransactionsPage from "./pages/TransactionsPage";
import { selectAuth, selectTracking } from "./store/selectors.js";
import {
  defineLabels,
  setDailyExpenses,
  setDailyIncome,
} from "./store/trackingSlice.js";
import { useAuthListener } from "./useAuthListener.js";

function App() {
  const { transactions, statusLoading, dataLoaded, labels } =
    useSelector(selectTracking);
  const { isUserLogged } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defineLabels(countPeriod()));
  }, []);

  useAuthListener();

  useEffect(() => {
    if (isUserLogged) {
      dispatch(
        setDailyExpenses(
          separateArraysForChart(transactions, labels, "expenses")
        )
      );
      dispatch(
        setDailyIncome(separateArraysForChart(transactions, labels, "incomes"))
      );
    }
  }, [transactions, dataLoaded, labels]);

  if (statusLoading === "idle") {
    return (
      <div className="app">
        <SnackbarProvider />
        <HashRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </HashRouter>
      </div>
    );
  } else if (statusLoading === "loading") {
    return (
      <div className="loader-icon">
        <PacmanLoader color="#4c6663" />
      </div>
    );
  }
}

export default App;
