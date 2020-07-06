import React from "react";
import { Link, graphql } from "gatsby";
import { FaSearch, FaTags } from "react-icons/fa";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import "./styles/index.scss"; //페이지 전체에 적용해야할 스타일

const IndexPage = ({ data }) => {
  const itemes = data.allMarkdownRemark.edges.map(({ node }) => (
    <div className="post_item">
      {/*그래프쿼리를 map으로 순회한 글들을 반환*/}
      <h1>{node.frontmatter.title}</h1>
      <p>{node.excerpt}</p>
    </div>
  ));

  return (
    <Layout>
      <div className="main_container">
        <div className="menu_category">
          <a>개발</a>
          <a>일상</a>
        </div>
        <div className="input_box">
          <input type="text" />
          <FaSearch className="input_box_search" />
        </div>
        {itemes}
      </div>
    </Layout>
  );
};

export default IndexPage;
export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`;
