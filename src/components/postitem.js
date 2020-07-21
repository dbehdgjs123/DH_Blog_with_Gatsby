import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { useState } from "react";
import { useCallback } from "react";

function PostItem({ category, searchData }) {
  //일상 카테고리와 그렇지 않을때의 쿼리를 나눔.
  const data = useStaticQuery(
    graphql`
      query {
        development: allMarkdownRemark(
          filter: { frontmatter: { category: { ne: "daily" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
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
        daily: allMarkdownRemark(
          filter: { frontmatter: { category: { eq: "daily" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
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
  const [postNumber, setPostNumber] = useState(10);
  let pN = 0; //검색되었을때 중복되어서 안보이면 안되므로 선언.

  const scrollBotton = useCallback(() => {
    const { innerHeight } = window; //윈도우창크기
    const { scrollHeight } = document.body; //바디의 크기
    const scrollTop = window.scrollY || document.documentElement.scrollTop; //현재 스크롤 위치
    if (scrollHeight - innerHeight - scrollTop < 100) {
      //아래 쪽까지의 높이가 100이하이면 액티브
      setPostNumber(postNumber + 10);
    }
  }, [postNumber]);

  const itemes = !category
    ? data.development.edges
        .map(({ node }) => {
          if (
            node.frontmatter.title //검색기능 구현
              .toLowerCase() //대소문자 구분 x
              .replace(/ /gi, "") //공백제거
              .includes(searchData.toLowerCase().replace(/ /gi, "")) //검색창에 치는 글자가 포함되면 렌더링
          ) {
            pN++; //pn이 현재 액티브 되야할 포스트넘버보다 작으면 출력 x pn은 map수만큼 ++
            return (
              <div
                className={`post_item ${
                  pN <= postNumber ? "active" : "hidden"
                }`}
                key={node.id}
              >
                <Link to={node.fields.slug}>
                  <div>
                    {/*그래프쿼리를 map으로 순회한 글들을 반환*/}
                    <div>
                      <h1>{node.frontmatter.title}</h1>
                      <p>{node.excerpt}</p>
                      <p className="post_item_date">{node.frontmatter.date}</p>
                    </div>
                  </div>
                </Link>
                <div className="post_item_tag">
                  {node.frontmatter.tags.map((item, index) => {
                    return (
                      <Link to={`/tags/${kebabCase(item)}`} key={index}>
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
        .filter(n => n) //null인지 체크한다.
    : data.daily.edges
        .map(({ node }) => {
          if (
            node.frontmatter.title
              .toLowerCase()
              .replace(/ /gi, "")
              .includes(searchData.toLowerCase().replace(/ /gi, ""))
          ) {
            return (
              <div className="post_item" key={node.id}>
                <Link to={node.fields.slug}>
                  <div>
                    <div>
                      <h1>{node.frontmatter.title}</h1>
                      <p>{node.excerpt}</p>
                      <p className="post_item_date">{node.frontmatter.date}</p>
                    </div>
                  </div>
                </Link>
                <div className="post_item_tag">
                  {node.frontmatter.tags.map((item, index) => {
                    return (
                      <Link to={`/tags/${kebabCase(item)}`} key={index}>
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
        .filter(n => n);
  useEffect(() => {
    window.addEventListener("scroll", scrollBotton);
    return () => window.removeEventListener("scroll", scrollBotton); //메모리 누수 방지
  }, [scrollBotton]);

  return (
    <>
      {itemes.length ? (
        itemes
      ) : (
        <div className="post_item">
          <div className="not_search">해당되는 검색어를 찾지 못했습니다.</div>
        </div>
      )}
    </>
  );
}

export default PostItem;
