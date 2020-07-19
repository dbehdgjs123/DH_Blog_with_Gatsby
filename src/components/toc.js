import React from "react";
import "./compoStyles/toc.scss";
import styled from "styled-components";
import "../pages/them-color.scss";
import { FaBookmark } from "react-icons/fa";
const Box = styled.div`
    
    & ul {
      margin-left:10px;
    }
    a {
      color: #838383;
    }
    a[href="${props => props.headerUrl}"] {
      color: var(--active); /*props로 받은 주소값과 같으면 스타일 변경*/
      font-size:1.2rem;
      font-weight: bold;
      transition: all 0.1s linear;
    }
    a:hover {
      color: var(--active);
    }
    li {
      margin-bottom: 10px; 
    }
  `;
function TOC({ post, headerUrl }) {
  const tocItem =
    post.tableOfContents !== "" ? (
      <div>
        <span>
          <FaBookmark className="toc_mark" />
          &nbsp; TOC
        </span>
        <Box
          dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          headerUrl={headerUrl}
        />
      </div>
    ) : null;
  return <div className="blog-post-tablecontent">{tocItem}</div>;
}

export default TOC;
