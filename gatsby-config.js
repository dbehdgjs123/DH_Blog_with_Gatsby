module.exports = {
  siteMetadata: {
    title: `Dev.Yu BLOG`,
    description: `주저말고 시작을`,
    author: `YuDongHeon`,
    lang: `ko-KR`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`, //지정된 링크를 하이라이트하기위해 설정
              maintainCase: false, //url이 대소문자를 구분하기 때문에 링크가 작동하지 않을 수 있다.
              removeAccents: true,
              elements: [`h2`, "h3", `h4`],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nanum Pen Script`,
          `Nanum Gothic`,
          `Nanum Myeongjo`,
          `Nanum Brush Script`,
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `devdh`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `YULOG`,
        short_name: `YULOG`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        display: `standalone`,
        icon: `./src/images/gatsby-icon.png`,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
