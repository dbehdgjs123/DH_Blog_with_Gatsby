import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

function PostItem() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "YYYY년 MM월 DD일")
                tags
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  );
  const itemes = data.allMarkdownRemark.edges.map(({ node }) => (
    <Link to={node.fields.slug}>
      <div className="post_item" key={node.id}>
        {/*그래프쿼리를 map으로 순회한 글들을 반환*/}
        <div>
          <h2>{node.frontmatter.title}</h2>
          <p>{node.excerpt}</p>
          <p className="post_item_date">{node.frontmatter.date}</p>
          <div className="post_item_tag">
            {node.frontmatter.tags.map((item, index) => {
              return <a key={index}>{item}</a>;
            })}
          </div>
        </div>
      </div>
    </Link>
  ));

  return <>{itemes}</>;
}

export default PostItem;
