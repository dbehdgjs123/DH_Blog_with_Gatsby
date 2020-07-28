/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

const { createFilePath } = require("gatsby-source-filesystem");
const path = require(`path`);
const _ = require("lodash");

//노드가 업데이트나 생성 될때 마다 마크다운파일만 골라내서 노드의 부모인 파일 노드를 찾고 그 파일의 이름으로 slug를만든다. 그후 gql에 추가한다.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "md-pages" });
    let realSlug = slug.split("/"); //파일 경로 분리.
    realSlug = realSlug[realSlug.length - 2]; //맨 끝 슬러그까지 분리하면 마지막에서 두번째가 실제 파일경로.

    createNodeField({
      node,
      name: "slug",
      value: `/${realSlug}/`,
    });
  }
};

//페이지를 만들기위해 createPage api 를 사용한다. 모든 마크다운파일의 slug gql로 가져와서 페이지를 만든다.

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      blogquery: allMarkdownRemark(
        filter: { frontmatter: { category: { ne: "daily" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
              date
              tags
              category
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
              date
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
      dailyblogquery: allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "daily" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
              date
              tags
              category
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
              date
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
      tagquery: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  //태그의 최대개수를 2000개로 설정
  if (result.errors) {
    reporter.panicOnBuild(`쿼리하는 동안 문제가 생겼습니다.`);
    return;
  }

  result.data.blogquery.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
        next,
        previous,
      },
    });
  });

  result.data.dailyblogquery.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
        next,
        previous,
      },
    });
  });

  const tagpost = result.data.tagquery.group;

  tagpost.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/tag-post.js`),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
