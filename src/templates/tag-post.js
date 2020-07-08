import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import kebabCase from "lodash/kebabCase";
import "./tag-post.scss";

function TagPost({ pageContext, data }) {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;

  const item = edges.map(({ node }) => (
    <div className="tag_item" key={node.fields.slug}>
      <Link to={node.fields.slug}>
        <div>
          {/*태그가 속한 글들을 반환*/}
          <div>
            <h1>{node.frontmatter.title}</h1>
            <p>{node.excerpt}</p>
            <p className="tag_item_date">{node.frontmatter.date}</p>
          </div>
        </div>
      </Link>
      <div className="tag_item_tag">
        {node.frontmatter.tags.map((item, index) => {
          return (
            <Link to={`/tags/${kebabCase(item)}`} key={index}>
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  ));
  return (
    <Layout>
      <div className="tag_list">
        <h1 className="tag_list_title">
          '{tag}' 에 대한 작성글이 {totalCount}개 있습니다.
        </h1>
        {item}
      </div>
    </Layout>
  );
}

export default TagPost;

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`;
