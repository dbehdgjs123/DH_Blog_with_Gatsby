/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import GlobalContextProvider from "../context/GlobalContextProvider";

import Header from "./header";
import "./compoStyles/layout.scss";
import { useState } from "react";

const Layout = ({ children, searchRefHandler }) => {
  const [headerActive, setHeaderActive] = useState("");
  const [linkTop, setLinkTop] = useState("");
  let pageY; //스크롤을 올렸는지 내렸는지 알기 위해 사용
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    window.addEventListener("scroll", scrollMove);
    window.addEventListener("scroll", activeTop);
    return () => {
      window.removeEventListener("scroll", scrollMove);
      window.removeEventListener("scroll", activeTop);
    }; //메모리 누수 방지
  }, []);
  const scrollMove = () => {
    window.scrollY - pageY > 0
      ? setHeaderActive("hidden")
      : setHeaderActive("");
    pageY = window.scrollY;
  };
  const activeTop = () => {
    pageY > window.innerHeight ? setLinkTop("active") : setLinkTop("");
  };
  const onTopHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={`header-container ${headerActive}`}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          searchRefHandler={searchRefHandler}
          headerActive={headerActive}
        />
      </div>
      <div className={`link-top ${linkTop}`} onClick={onTopHandler}>
        <AiOutlineVerticalAlignTop />
      </div>

      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Layout);
