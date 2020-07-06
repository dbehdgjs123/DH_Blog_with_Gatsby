import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function PostItem() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                date
                tags
              }
              excerpt
            }
          }
        }
      }
    `
  );
  const itemes = data.allMarkdownRemark.edges.map(({ node }) => (
    <div className="post_item" key={node.id}>
      {/*그래프쿼리를 map으로 순회한 글들을 반환*/}
      <div>
        <h1>{node.frontmatter.title}</h1>
        <p>{node.excerpt}</p>
        <div className="post_item_tag">
          {node.frontmatter.tags.map((item, index) => {
            return <a key={index}>{item}</a>;
          })}
        </div>
      </div>
    </div>
  ));

  return <>{itemes}</>;
}

export default PostItem;
