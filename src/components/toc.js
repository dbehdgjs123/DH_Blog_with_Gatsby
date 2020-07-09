import React from "react";
import "./compoStyles/toc.scss";
import styled from "styled-components";

const Box = styled.div`
    position: sticky;
    top: 20rem;
    width: 200px;
    a {
      color: #838383;
    }
    a[href="${props => props.headerUrl}"] {
      color: #1b1b1b;
    }
    a:hover {
      color: #1b1b1b;
    }
  `;
function TOC({ post, headerUrl }) {
  return (
    <div className="blog-post-tablecontent">
      <Box
        dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
        headerUrl={headerUrl}
      />
    </div>
  );
}

export default TOC;
