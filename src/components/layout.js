/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import Header from "./header";
import "./compoStyles/layout.scss";

const Layout = ({ children, searchRefHandler }) => {
  const [headerActive, setHeaderActive] = useState("");
  const [linkTop, setLinkTop] = useState("");
  const [pageY, setPageY] = useState(0); //스크롤을 올렸는지 내렸는지 알기 위해 사용

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const scrollMove = useCallback(() => {
    window.scrollY - pageY > 0
      ? setHeaderActive("hidden")
      : setHeaderActive("");
    setPageY(window.scrollY);
  }, [pageY]);

  const activeTop = useCallback(() => {
    pageY > window.innerHeight ? setLinkTop("active") : setLinkTop("");
  }, [pageY]);

  const onTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollMove);
    window.addEventListener("scroll", activeTop);

    return () => {
      window.removeEventListener("scroll", scrollMove);
      window.removeEventListener("scroll", activeTop);
    }; //메모리 누수 방지
  }, [scrollMove, activeTop]);

  return (
    <>
      <div className={`header-container ${headerActive}`}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteDescription={data.site.siteMetadata.description}
          searchRefHandler={searchRefHandler}
        />
      </div>
      <div
        className={`link-top ${linkTop}`}
        role="button"
        tabIndex="0"
        onKeyDown={onTopHandler}
        onClick={onTopHandler}
      >
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
