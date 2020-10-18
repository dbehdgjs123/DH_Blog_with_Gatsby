# 📙Dev.yulog
> 본 프로젝트는 gatsby cli(gatsby-starter-default)로 초기구성부터 제작했습니다.

**블로그 링크:** https://dev-yulog.netlify.app/

# 📘프로젝트 동기

개발자라면 자기가 만든 블로그 하나 정도는 있어야 된다고 생각했기 때문에 블로그를 선정했습니다. 어떤식으로 만들지? 라고 생각하고 검색을 해보다가 리액트의 프레임워크인 개츠비에 대해서 알게되었습니다. 문서를 읽어보니 정말 매력적으로 다가와 '개츠비를 통한 블로그만들기' 프로젝트를 시작했습니다.
# ⌚️프로젝트 기간

 _2020.07.04 ~

# 💻프로젝트에 사용된 주요기술

 * 배포
   - Netlify
 
 * 프론트엔드 (REACT)
   - React(v16.12.0)
   - Gatsby
   - Scss
   - Styled-components
    
# 📁간략한 폴더구조

> 간략하게 폴더의 구조와 설명을 포현했습니다.
   * md-pages (포스팅 한 글들)
   * src
     - components
       - compoStyles(컴포넌트에 대한 scss파일 모음)
       - header.js
       - layout.js (전역적으로 사용할 레이아웃 컴포넌트)
       - postitem.js (게시글들을 나열하는 컴포넌트)
       - seo.js (seo를 위한 컴포넌트 metadata설정)
       - taglist.js (태그 게시글들을 나열하는 컴포넌트)
       - toc.js (게시물을 볼 때 편하게 보기 위해 구현한 toc기능)
     - context
       -GlobalContextProvider.js(다크모드를 위한 전역 상태관리를 하기위해 contextApi사용)
     - images (이미지 파일 모음)
     - pages (기본 gatsby 폴더로 index.js가 있다.)
       - styles(page 폴더에 있는 컴포넌트에 대한 scss파일 모음)
     - templates
       - blog-post.js(포스트에 대한 마크다운파일들이 실행될 템플릿)
       - tag-post.js(태그 검색시 나오는 마크다운파일들이 실행될 템플릿)
   * gatsby-browser.js (gatsby의 browser api를 위한 컴포넌트이다. 다크모드를 위해사용)
   * gatsby-config.js (기본 설정파일, 사이트 메타데이터나 플러그인들을 적용할때 필요)
   * gatsby-node.js (gatsby node api를 위해 필요,페이지를 만들기 위해 사용)
   * gatsby-ssr.js (gatsby의 서버사이드렌더링 api를 위한 컴포넌트. 다크모드를 위해사용)
    
# 📜기능

  1. 마크다운 형식의 글쓰기
  2. TOC기능(styled-componenet를 활용한 목차기능)
  3. context api를 활용한 다크모드 구현
  4. 검색기능
  5. 태그기능
  6. 무한 스크롤링
  7. disqus를 활용한 댓글
  8. netlify를 활용한 자동 배포
  9. 검색 엔진 최적화(seo)
   
# ⚙️프로젝트시 부딪혔던 점들..

### TOC 기능

유명한 블로그(velog,medium)들이나 몇몇 디자인이 이쁜 블로그들을 보면 Toc기능이 정말 잘되어 있었다. 내 블로그는 텅텅 빈 느낌이라 구현해보기로 했는데, 기본 목차는 graphql로 어떻게든 가져올 수 있었지만 내가 원하는건 독자가 보고있는 부분이 하이라이트 되는 것이였다.

이 부분은 그동안 잘 써보지 않았던 styled component를 통해 해결하였다. props를 스타일로 바로 적용할 수 있는 장점을 통해 url를 pros로 받아 그 url과 일치하는 단락을 하이라이트 시켜주었다.
```javascript
//toc.js의 상위 컴포넌트인 blog-post.js중 일부

  const onScrollHandler = e => {
    let checkpoint;
    const currentOffsetY = window.pageYOffset;
    const headerElements = document.querySelectorAll(".anchor-header");

    for (const item of headerElements) {
      const { top } = item.getBoundingClientRect();
      const elemTop = top + currentOffsetY;
      //const lastItem = headerElements[headerElements.length - 1];
      if (elemTop < currentOffsetY + 10) {
        //현재 아이템의 높이와 페이지 크기를 합친 것보다  현재 높이가 크면 props로 보내준다.
        //만약 마지막 아이템이면 무조건 크므로 checkpoint를 전달할 수 없게 된다. 그러므로 따로 조건문으로 처리한다.
        checkpoint = item.href.split(window.location.origin)[1];
        if (headerElements[headerElements.length - 1] === item) {
          setTocHighlight(item.href.split(window.location.origin)[1]);
        }
      } else {
        setTocHighlight(checkpoint);
      }
    }
  };
```

```javascript
//toc.js중 일부
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
```

### 다크모드

글을 볼 땐 최적의 환경을 맞춰야 한다고 생각하여 전역적으로 다크모드를 도입하고 싶었다. 하지만 이 것 하나 때문에 redux를 도입하기엔 낭비가 크다고 생각했기 때문에 react에 내장된 context api를 사용해보고자 했다.

* 다크모드의 요구사항은 다음과 같았다.
   - 설정되어 있지 않을 땐 라이트모드
   - 다음 번 방문할때 현재 테마 저장
   - 사용자가 직접 바꿀 수 있는 라이트모드,다크모드
   
gatsby는 정적 페이지 생성기이기 때문에 다크모드에 관련된 설정은 빌드가 되기 전에 모든게 완료 되어야만 되었다. 다행이 gatsby-ssr에서 이런 문제들을 해결할 수 있었다.  context에대한 provider 컴포넌트를 만들어서 모든 element들을 감싸주었다.
```javascript
//gatsby-ssr.js
import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme",
      dangerouslySetInnerHTML: {
        __html: `(function() { //초기설정 즉시실행
          function setTheme(newTheme) {
            preferredTheme = newTheme;
            document.body.className = newTheme;
            document.body.style.transition = "all 0s"; //깜빡임 현상때문에 불편할 수 있으므로 즉시 0s로 만든다.
            window.__theme = newTheme; //전역 변수에 저장한다.
          }
          let preferredTheme
          try {
            preferredTheme = localStorage.getItem('themeColor')
          } catch (err) {}

          window.__setPreferredTheme = function (newTheme) {
            setTheme(newTheme) //토글 함수
            try {
              localStorage.setItem('themeColor',newTheme)
            } catch (err) {}
          }
          let darkQuery = window.matchMedia('(prefers-color-scheme: dark)') //미디어 쿼리의 prefers-color-scheme기능을 통해 브라우저의 다크모드 설정을 가져온다.
            darkQuery.addListener(e => {
              window.__setPreferredTheme(e.matches ? 'light' : 'dark')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'light' : 'dark')) //로컬스토리지에 있다면 그걸먼저 가져온다.
        })();`,
      },
    }),
  ]);
};

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
```
__setPreferredTheme 함수를 호출하기만 하면 로컬스토리지에 저장되고 테마가 바뀐다.

다크모드일때와 라이트모드일때는 편하게 관리하기 위해 css의 사용자 지정 변수를 사용했다.
```
body {
  &.light {
    --bg: #f8f8f8;
    --title: #2c2d31;
    --subtitle: #838383;
    --text: #3f3f3f;
    --btn: #838383;
    --active: #1b1b1b;
    --line: #838383;
    --btn2: #1b1b1b;
    --btn3: #1b1b1b;
    --htext: #c9c9c9;
    --blogtitle: #2c2d31;
  }
  &.dark {
    --bg: #1b1b1b;
    --title: #cccccc;
    --subtitle: #636363;
    --text: #979797;
    --btn: #636363;
    --active: #b8b8b8;
    --line: #636363;
    --btn2: #727272;
    --btn3: #1b1b1b;
    --htext: #9e9e9e;
    --blogtitle: #b6b6b6;
  }
}
```
### 댓글

정적 페이지인만큼 댓글 기능을 직접 구현할 수 없었기에 고심 끝에 disqus를 사용했다.

### SEO

이번 프로젝트를 통해 seo에 대한 지식을 많이 얻었다. 잘 모르고 있던 지식이었고 내 블로그를 많이 노출 시키고 싶었기에 자연스럽게 알게 되었다.

_크롤링 -> 색인 생성 -> 순위 지정 -> 게재_

검색 엔진은 대부분 이렇게 돌아간다고 알고 있기에 크롤링을 하는 봇(크롤러)에게 사이트를 정확히 줄 수록 노출 가능성이 높아진다고 했기에 내가 seo를 적용하는데 과정은 이랬다.

1. gatsby에서 sitemap 플러그인을 적용해서 업데이트 자동화를 해주었다.
2. robots.txt를 통해 사이트의 접근 허용 범위를 크롤러에게 알려주도록 했다.

또한, 헤더에 meta 데이터를 넣어줘야하기 때문에 csr인 react에서는 helmet을 사용할 수 있었다. gatsby-plugin-react-helmet은 여기에 더해져서 정적파일 빌드시 헤더값이 설정되기 때문에 크롤러가 잘 읽을 수 있다.

```javascript
//seo.js중 일부
//graphql로 사이트 정보를 가져온후 props로 내려주어 메타데이터에 넣어주었다.
<Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang ?? lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keyword,
        },
        {
          name: `google-site-verification`,
          content: `jnUcvtMlXgf1mv7O-g7lR2zVw_tWnO4KrRrONgACYcQ`,
        },
      ].concat(meta)}
    />
```

# 완성 모습
 * pc 
 ---
 ![완성(pc)](https://user-images.githubusercontent.com/61229227/96349418-723e2880-10ea-11eb-9c06-eec1749e048b.PNG)
 * ipad 
 ---
 ![완성(ipad)](https://user-images.githubusercontent.com/61229227/96349416-710cfb80-10ea-11eb-87f5-b3fef30e7a81.PNG)
 * mobile 
 ---
 ![완성(모바일)](https://user-images.githubusercontent.com/61229227/96349419-736f5580-10ea-11eb-8876-712d13324727.PNG)
 
# 👨🏼‍💻learned...

1. 클라이언트와 서버측의 흐름을 많이 알 수 있었다.
2. 웹서비스의 기획부터 배포까지 전반적인 흐름을 많이 알 수 있었다.
3. 프로젝트 규모에 따른 상태관리의 필요성.

# 마치며

프로젝트를 처음 할 때 목표중 하나는 라이브러리를 최대한 줄이는 것이었습니다. 부트스트랩,머테리얼ui등의 라이브러리나 프레임워크를 사용하지 않고 스스로 거의 대부분의 것들을 직접 구현하여 개발을 하고 싶었습니다. 결과는 만족이고 앞으로 더 많은 것들을 직접 구현해볼 생각입니다.😄
