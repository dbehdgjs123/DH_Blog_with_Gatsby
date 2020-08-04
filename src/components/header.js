import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import profile1 from "../images/profile1.jpg";
import {
  FaSearch,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaTags,
  FaSun,
  FaMoon,
  FaAngleDown,
  FaUserCircle,
} from "react-icons/fa";
import "./compoStyles/header.scss";
import TagList from "./taglist";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const Header = ({
  siteTitle,
  siteDescription,
  searchRefHandler,
  headerActive,
}) => {
  const [sns, setSns] = useState("");
  const [snsTransition, setSnsTransition] = useState("hidden");

  const [tagMenu, setTagMenu] = useState("");
  const [tagTransition, setTagTransition] = useState("hidden");

  const dispath = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const showSns = () => {
    if (sns === "") {
      setSns("active");
      setTimeout(() => {
        setSnsTransition("showing");
      }, 0); //시간을 0으로 해도 실행되고 있던 메서드가 다 끝난후에 실행됨.
    } else {
      setSnsTransition("hidden");
      setTimeout(() => {
        setSns("");
      }, 700);
    }
  };

  const showTag = () => {
    if (tagMenu === "") {
      setTagMenu("active");
      setTimeout(() => {
        setTagTransition("showing");
      }, 0); //시간을 0으로 해도 실행되고 있던 메서드가 다 끝난후에 실행됨.
    } else {
      setTagTransition("hidden");
      setTimeout(() => {
        setTagMenu("");
      }, 1200);
    }
  };
  const focusSearch = () => {
    if (searchRefHandler !== undefined) {
      searchRefHandler(); //index에서 props를 주지 않을경우 없으므로 실행 안됨.
    } else {
      return;
    }
  };
  return (
    <header>
      <div className="title_container">
        <Link to="/" className="title" state={{ searchFocus: false }}>
          <img src={profile1} alt="Home" />
          <div className="title_text">
            {siteTitle}
            <span>{siteDescription}</span>
          </div>
        </Link>
        <Link to="/aboutme" className="about_btn">
          About me
        </Link>
        <div className="contect_sns">
          <button onClick={showSns} className={sns}>
            <FaAngleDown />
          </button>
          <div className="contect_sns_list">
            <a
              className={`${sns} ${snsTransition}`}
              href="https://www.instagram.com/yu_dongheon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className={`${sns} ${snsTransition}`}
              href="https://github.com/dbehdgjs123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              className={`${sns} ${snsTransition}`}
              href="https://www.facebook.com/profile.php?id=100006436004409"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <Link to="/aboutme" className={`${sns} ${snsTransition}`}>
              <FaUserCircle />
            </Link>
          </div>
        </div>
      </div>

      <div className="right_menu">
        <div
          className="right_menu_theme"
          role="button"
          tabIndex="0"
          onClick={() => {
            dispath({ type: "TOGGLE_THEME" });
          }}
          onKeyDown={() => {
            dispath({ type: "TOGGLE_THEME" });
          }}
        >
          {state.theme === "light" ? <FaSun /> : <FaMoon />}
        </div>

        <div className="right_menu_tag">
          <div
            role="button"
            tabIndex="0"
            onClick={showTag}
            onKeyDown={showTag}
            className={tagMenu}
          >
            <FaTags />
          </div>
          <TagList transition={tagTransition} tagState={tagMenu} />
        </div>
        <Link to="/" onClick={focusSearch} state={{ searchFocus: true }}>
          <FaSearch />
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default React.memo(Header);
