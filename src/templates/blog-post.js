import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import "./blog-post.scss";
import TOC from "../components/toc";

//마크다운파일을 사용할 템플릿. 여기서 마크다운파일들이 실행됨.
function BlogPost({ data }) {
  const post = data.markdownRemark;
  const [tocHighlight, setTocHighlight] = useState(undefined);
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler); //메모리 누수 방지
  }, []);
  const onScrollHandler = e => {
    const currentOffsetY = window.pageYOffset;
    const headerElements = document.querySelectorAll(".anchor-header");
    for (const item of headerElements) {
      const { top } = item.getBoundingClientRect();
      const elemTop = top + currentOffsetY;
      const lastItem = headerElements[headerElements.length - 1];
      if (elemTop <= currentOffsetY) {
        //현재 아이템의 높이와 페이지 크기를 합친 것보다  현재 높이가 크면 props로 보내준다.
        setTocHighlight(item.href.split(window.location.origin)[1]);
      }
    }
  };
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post-title">
          <h1>{post.frontmatter.title}</h1>
        </div>
        <div
          className="original-text"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <TOC post={post} headerUrl={tocHighlight} />
      </div>
    </Layout>
  );
}

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`;
