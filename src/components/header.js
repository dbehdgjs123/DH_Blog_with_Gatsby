import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
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
} from "react-icons/fa";
import "./compoStyles/header.scss";
import TagList from "./taglist";

const Header = ({ siteTitle }) => {
  const [sns, setSns] = useState("");
  const [snsTransition, setSnsTransition] = useState("hidden");

  const [tagMenu, setTagMenu] = useState("");
  const [tagTransition, setTagTransition] = useState("hidden");

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
  return (
    <header>
      <div className="title_container">
        <Link to="/" className="title">
          <img src={profile1} alt="Home" />
          <div className="title_text">
            {siteTitle}
            <br />
            <span>시작이 반이다.</span>
          </div>
        </Link>
        <Link to="/" className="about_btn">
          About me
        </Link>
      </div>
      <div className="contect_sns">
        <button onClick={showSns} className={sns}>
          <FaAngleDown />
        </button>
        <div className="contect_sns_list">
          <a className={`${sns} ${snsTransition}`}>
            <FaInstagram />
          </a>
          <a className={`${sns} ${snsTransition}`}>
            <FaGithub />
          </a>
          <a className={`${sns} ${snsTransition}`}>
            <FaFacebook />
          </a>
        </div>
      </div>
      <div className="right_menu">
        <div className="right_menu_tag">
          <a onClick={showTag} className={tagMenu}>
            <FaTags />
          </a>
          <TagList transition={tagTransition} tagState={tagMenu} />
        </div>
        <a>
          <FaSearch />
        </a>
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

export default Header;
