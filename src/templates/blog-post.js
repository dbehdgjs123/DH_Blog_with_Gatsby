import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import "./blog-post.scss";
import TOC from "../components/toc";
import kebabCase from "lodash/kebabCase";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//마크다운파일을 사용할 템플릿. 여기서 마크다운파일들이 실행됨.
function BlogPost({ pageContext, data }) {
  const [tocHighlight, setTocHighlight] = useState(undefined);
  const post = data.markdownRemark;
  const { next, previous } = pageContext;
  console.log("next" + next);
  console.log("prev" + previous);

  const nextPage =
    next !== null ? (
      <Link to={next.fields.slug}>
        <div className="other-page-next">
          <div>
            <span className="other-page-subtext">다음 포스트</span>
            <span className="other-page-text">{next.frontmatter.title}</span>
          </div>
          <div className="other-page-next-right">
            <FaArrowRight />
          </div>
        </div>
      </Link>
    ) : null;

  const prevPage =
    previous !== null ? (
      <Link to={previous.fields.slug}>
        <div className="other-page-prev">
          <div className="other-page-prev-left">
            <FaArrowLeft />
          </div>
          <div>
            <span className="other-page-subtext">이전 포스트</span>
            <span className="other-page-text">
              {previous.frontmatter.title}
            </span>
          </div>
        </div>
      </Link>
    ) : null;

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
      //const lastItem = headerElements[headerElements.length - 1];
      if (elemTop <= currentOffsetY) {
        //현재 아이템의 높이와 페이지 크기를 합친 것보다  현재 높이가 크면 props로 보내준다.
        setTocHighlight(item.href.split(window.location.origin)[1]);
      }
    }
  };

  const tagItme = post.frontmatter.tags.map((item, index) => (
    <Link to={`/tags/${kebabCase(item)}`} key={index}>
      {item}
    </Link>
  ));
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post-title">
          <h1>{post.frontmatter.title}</h1>
          <div className="blog-post-subtitle">
            <span>Dev.Yu | {post.frontmatter.date}</span>
            <div className="blog-post-tagbox">{tagItme}</div>
          </div>
        </div>
        <div
          className="original-text"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="other-page">
          <div className="other-page-prevbox">{prevPage}</div>
          <div className="other-page-nextbox">{nextPage}</div>
        </div>
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
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
`;
