import React, { useState } from "react";
import { Link } from "gatsby";
import { FaSearch, FaTags } from "react-icons/fa";
import Layout from "../components/layout";
import PostItem from "../components/postitem"; // 전체 글목록
import "./styles/index.scss"; //페이지 전체에 적용해야할 스타일

const IndexPage = ({ data }) => {
  const [menuSelect, setMenuSelect] = useState(false);

  const onSelectMenu = () => {
    setMenuSelect(!menuSelect); //false 일땐 개발에 체크, 그렇지 않을땐 일상이 되어있게함.
  };

  return (
    <Layout>
      <div className="main_container">
        <div className="menu_category">
          <a className={menuSelect ? "" : "active"} onClick={onSelectMenu}>
            개발
          </a>
          <a className={menuSelect ? "active" : ""} onClick={onSelectMenu}>
            일상
          </a>
        </div>
        <div className="input_box">
          <input type="text" />
          <FaSearch className="input_box_search" />
        </div>
        <div className="post_list">
          <PostItem />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
