import React, { useState, useRef, useEffect } from "react";
//import { Link } from "gatsby";
import { FaSearch } from "react-icons/fa";
import Layout from "../components/layout";
import PostItem from "../components/postitem"; // 전체 글목록
import "./styles/index.scss"; //페이지 전체에 적용해야할 스타일
import SEO from "../components/seo";
import { graphql } from "gatsby";

const IndexPage = ({ data, location }) => {
  const [menuSelect, setMenuSelect] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    if (location.state == null) {
      console.log(location);
      return; //location으로 온값이 true일때만 ref를 사용한다.
    } else {
      if (location.state.searchFocus === true) searchRef.current.focus();
      else {
        return;
      }
    }
  }, [location]);

  const onSelectMenu = () => {
    setMenuSelect(!menuSelect); //false 일땐 개발에 체크, 그렇지 않을땐 일상이 되어있게함.
    setsearchInput("");
  };
  const searchHandler = e => {
    setsearchInput(e.target.value);
  };
  const searchRefHandler = () => {
    searchRef.current.focus();
  };
  return (
    <Layout searchRefHandler={searchRefHandler}>
      <SEO
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
      <div className="main_container">
        <div className="menu_category">
          <div
            className={menuSelect ? "" : "active"}
            role="button"
            tabIndex="0"
            onKeyDown={onSelectMenu}
            onClick={onSelectMenu}
          >
            개발
          </div>
          <div
            className={menuSelect ? "active" : ""}
            role="button"
            tabIndex="0"
            onKeyDown={onSelectMenu}
            onClick={onSelectMenu}
          >
            일상
          </div>
        </div>
        <div className="input_box">
          <input
            type="text"
            value={searchInput}
            onChange={searchHandler}
            ref={searchRef}
            placeholder="검색어를 입력하세요"
          />
          <FaSearch className="input_box_search" />
        </div>
        <div className="post_list">
          <PostItem category={menuSelect} searchData={searchInput} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
