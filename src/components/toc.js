import React, { useContext } from "react";
import "./compoStyles/toc.scss";
import styled from "styled-components";
import { GlobalStateContext } from "../context/GlobalContextProvider";

const Box = styled.div`
    
    & ul {
      margin-left:10px;
    }
    a {
      color: #838383;
    }
    a[href="${props => props.headerUrl}"] {
      color: #1b1b1b; /*props로 받은 주소값과 같으면 스타일 변경*/
      font-size:1.2rem;
      transition: all 0.1s linear;
    }
    a:hover {
      color: #1b1b1b;
    }
    li {
      margin-bottom: 10px; 
    }
  `;
const DBox = styled.div`
    
  & ul {
    margin-left:10px;
  }
  a {
    color: #838383;
  }
  a[href="${props => props.headerUrl}"] {
    color: #bdbdbd; /*props로 받은 주소값과 같으면 스타일 변경*/
    font-size:1.2rem;
    transition: all 0.1s linear;
  }
  a:hover {
    color: #bdbdbd;
  }
  li {
    margin-bottom: 10px; 
  }
`;
function TOC({ post, headerUrl }) {
  const state = useContext(GlobalStateContext);

  const tocItem =
    post.tableOfContents !== "" ? (
      <div>
        <span>TOC</span>
        {state.theme === "dark" ? (
          <DBox
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            headerUrl={headerUrl}
          />
        ) : (
          <Box
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            headerUrl={headerUrl}
          />
        )}
      </div>
    ) : null;
  return <div className="blog-post-tablecontent">{tocItem}</div>;
}

export default TOC;
