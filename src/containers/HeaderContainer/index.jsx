import React from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectTracking, selectUi } from "../../store/selectors";
import { logout } from "../../store/authSlice";
import { setIsOpenBurger, toggleIsOpenBurger } from "../../store/uiSlice";
import { defineLabels, handleFakeData } from "../../store/trackingSlice";
import { countPeriod } from "../../constants";

const HeaderContainer = ({ page }) => {
  const dispatch = useDispatch();

  const { isBurgerOpen } = useSelector(selectUi);
  const { isUserLogged } = useSelector(selectAuth);
  const { dataLoaded } = useSelector(selectTracking);

  const handleLogOut = () => {
    dispatch(defineLabels(countPeriod()));
    dispatch(handleFakeData());
    dispatch(logout());
    dispatch(setIsOpenBurger(false));
  };

  const handleToggleBurger = () => dispatch(toggleIsOpenBurger());

  return (
    <Header
      handleLogOut={handleLogOut}
      page={page}
      isUserLogged={isUserLogged}
      isOpen={isBurgerOpen}
      toggleOpen={handleToggleBurger}
      dataLoaded={dataLoaded}
    />
  );
};

export default HeaderContainer;
