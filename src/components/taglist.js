import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import kebabCase from "lodash/kebabCase";

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
    <Link
      to={`/tags/${kebabCase(tag)}`}
      key={index}
      className={`${tagState} ${transition}`}
    >
      {tag}
    </Link>
  ));
  return <div className="tag_list">{tagItem}</div>;
}

export default TagList;
