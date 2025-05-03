import Hamburger from "hamburger-react";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import "./styles.scss";

const Header = ({ handleLogOut, isUserLogged, isOpen, toggleOpen }) => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-left__title">Balance</div>
      </div>

      <div className="header-right">
        {!isUserLogged && (
          <div className="header-registration">
            <div className="header-login">
              <Link to="/sign-in">Log In</Link>
            </div>
            <div className="header-signup">
              <Link to="/sign-up">Sign Up</Link>
            </div>
          </div>
        )}

        {isUserLogged && (
          <>
            <button onClick={handleLogOut} className="header-right_logout">
              <CiLogout size="2em" color="black" />
            </button>

            <div className="header-right_btn">
              <Hamburger toggled={isOpen} toggle={toggleOpen} size={30} />
            </div>
          </>
        )}
      </div>

      <div className={`burger-menu ${isOpen ? "open" : "closed"}`}>
        <div className="burger-menu__top">
          <div className="burger-menu__title">Balance</div>
          <div className="burger-menu__actions">
            <button onClick={handleLogOut} className="burger-logout">
              <CiLogout size="2em" color="black" />
            </button>
            <Hamburger toggled={isOpen} toggle={toggleOpen} size={30} />
          </div>
        </div>

        <nav className="burger-nav">
          <Link to="/home" onClick={toggleOpen}>
            🏠 Home
          </Link>
          <Link to="/transactions" onClick={toggleOpen}>
            💸 Transactions
          </Link>
          <Link to="/charts" onClick={toggleOpen}>
            📊 Charts
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
