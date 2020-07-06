import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function TagList({ transition, tagState }) {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  const tagItem = data.allMarkdownRemark.group.map(({ tag }, index) => (
    <a key={index} className={`${tagState} ${transition}`}>
      {tag}
    </a>
  ));
  return <div className="tag_list">{tagItem}</div>;
}

export default TagList;
