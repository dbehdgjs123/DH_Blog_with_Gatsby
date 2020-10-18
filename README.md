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
   * md-pages
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
    
# 📜주요 기능

  전역적으로 상태관리가 필수로 필요한 것들을 redux패턴으로 구현하였다.
  
  ### 게시판
    1. 글상세, 글쓰기, 글 수정, 글 삭제 기능 (crud)
    2. 글목록을 인기순,최신순,조회순,정확순 등으로 정렬 가능
    3. 한식,중식,일식 등 타임라인의 카테고리 기능
    4. 페이지네이션은 무한 스크롤로 구현
    5. 게시글 좋아요 기능
    6. 조회수 기능
  
  ### 댓글
    1. 기본적인 댓글기능(댓글 작성,댓글 삭제)
    2. 댓글 좋아요
  
  ### 유저
    1. 회원가입 및 로그인 기능
    2. auth 고차컴포넌트를 통한 페이지간 유저 인증
    3. 마이페이지, 유저 정보보기 기능
    4. 금주의 요리사(유저 랭킹 기능)
    5. 좋아요한 레시피뷰 기능
  
  ### 검색
    1. 일반 게시글 검색 기능, 태그 검색 기능
    2. 사이트에 있는 재료들중 원하는 재료를 통한 재료검색기능
   
# ⚙️프로젝트시 부딪혔던 점들..

### 클라이언트와 서버의 통신

백엔드는  프론트엔드를 한 번에 다 하는 프로젝트는 이번이 처음이었기 때문에 힘든점이 많았다.

restful한 api를 짜야한다는 생각은 있었지만 1인 프로젝트에서 지키기에는 너무 딱딱하다고 판단하여 대부분의 요청방식은 get(조회),post(삽입,수정)으로 통일해서 
조금더 유연하게 프로젝트의 방향을 잡았다. 

axios를 통해 통신하였으며 받는 방식은 무조건 객체형식의 {success: ?, result: ?}로 받기로 컨벤션을 정했다.

```javascript
   //프론트측 요청방식 일부
   if (res.data.success) { //성공시
          setList([...postList, ...res.data.result]);        
       } else { //실패시
          alert(res.data.message);
       }
```
```javascript
   //백엔드측 응답방식 일부
   const [result] = await pool.query(allSql, [parseInt(limit)]);
      if (result.length > 0) { //요청한 값이 있을 때
        return res.json({ success: true, posts: result });
      } else { //없을 때
        return res.json({ success: true, posts: [] });
      }
```

### 상태관리 방향

바로 직전 프로젝트에서 리액트를 사용할땐 context api로 redux의 역할이 해결되었고 전역적인 상태관리의 필요성이 그렇게 크지 않았기 때문에 괜찮았다.
하지만, 이번 프로젝트는 규모가 조금 더 커졌기 때문에 필요성을 확실히 느꼈고 redux 패턴을 처음 적용하니 난관이 많았다.

최종적으로 리덕스의 액션,액션 생성 함수,리듀서가 한 모듈에 들어간 방식을 채택했다.
```javascript
//모듈화된 방식중 일부

//액션
const LOADING_POST = "LOADING_POST";
//액션 생성함수
export const readHandler = (type, limit, isEnd) => async (dispatch) => {
  const foodType = typeGender(type);
  window.scrollTo(0, 0);
  dispatch({
    type: LOADING_POSTS,
  });
  const data = await axios
    .get(
      `${process.env.REACT_APP_SERVER_HOST}/api/post/getposts/${foodType}/${limit}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (data.success) {
    if (data.posts.length < 10) {
      isEnd();
    }
    dispatch({
      type: READ_POSTS,
      payload: data.posts,
    });
  } else {
    alert(data.message);
  }
};

//초깃값
const initialState = {
};

//
export default function post(state = initialState, action) {

  switch (action.type) {
    
    default:
      return state;
  }
}
```

### 페이지간 인증방식

페이지간 인증방식은 정말 생각을 많이 해야했다. 내가 생각했던 것들을 정리해보면..

1. 로그인 된 유저만 들어갈 수 있는 페이지가 있어야했다.(마이페이지)
2. 반대로 로그인 된 사람은 들어갈 수 없는 페이지가 있어야 했다.(로그인창,회원가입창)
3. 상관 없는 페이지도 있어야한다.(일반 게시글)

세 가지 요소를 종합하고 곰곰이 생각해본 결과 bool값을 인자로 받아서 그 값에 따라 각각 다른 컴포넌트를 반환하거나 리다이렉트 할 수 있도록 고차 컴포넌트를 사용하기로 했다.
```javascript
//auth.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authHandler } from "../../modules/user";
import { withRouter } from "react-router-dom";

function Auth(AuthComponent, option = null) {
  //고차 컴포넌트 구현
  //옵션 false => 로그인 안 된 사람만 들어온다.
  //옵션 true =? 로그인 된 사람만 들어온다.
  function CheckAuth(props) {
    const dispatch = useDispatch();
    //auth로 감싸진 모든 컴포넌트로 이동할때마다 호출
    useEffect(() => {
      dispatch(authHandler(option, props.history));
    }, [dispatch, props.history]);
    return <AuthComponent {...props} />;
    //props의 불변성을 지켜줘야함
  }
  return withRouter(CheckAuth);
}
export default Auth;
```
```javascript
//App.js중 일부
     <Switch>
       <Route exact path="/" component={Auth(MainPage)} />
       <Route exact path="/login" component={Auth(LoginPage, false)} />
     </Switch>
```

인증 방식은 쿠키에 jwt토큰을 발급 받아서 넣어준 후 쿠키의 유무로 판단하였다.
```javascript
//user.js 라우트중 일부
const token = jwt.sign(
            {
              userNo: result[0].user_no, //db의 유저넘버
            },
            jwtKey.secret,
            {
              expiresIn: "5h", //지속시간
            }
          );
          // 쿠키저장
          res.cookie("user", token, {
            httpOnly: true,
            secure: true,
            domain: "jabakexpress.site",
            sameSite: "none",
          });
```

### 비밀번호 보안

bcrypt를 사용하여 비밀번호를 암호화하여 데이터베이스에 넣어주었다.
```javascript
//user.js 라우트 중 일부
//비밀번호 암호화
    bcrypt.hash(password, rounds, async function (err, hash) {
      const result = await pool.query(sqlCreate, [email, id, hash, nickname]);
      return res.json({ success: true, result: result });
    });
```

### UX

리덕스와 관련된 문제기도 했다.

> 사용자들이 글을 쓰거나 수정하다가 모르고 뒤로가기를 누르면 어떡하지?
>> 사용자들이 글을 보다가 모르고 다른 페이지로 가면 어떡하지?

이런 비슷한 생각들을 하기 시작하면서 UX를 어떻게 좋게 할 수 있는가에 대한 갈등이 시작되었고 리덕스를 적극 도입하기로 했다. 
리덕스를 사용하면 상태를 전역적으로 관리할 수 있었고 그 말은 즉슨 다른 페이지를 갔다 와도 정보 유지가 가능하다는 뜻이었기 때문이다.

### 디바운싱,쓰로틀

서버의 과부하가 걸릴 일은 그리 많지 않겠지만 버튼을 여러번 누르거나 비정상적인 접근을 연속으로 할 경우의 대비도 하고 싶었다. 
자연스럽게 디바운스와 쓰로틀을 떠올렸다.

lodash의 메서드를 이용했고, 서버에 직접적으로 요청이 가게되는 것들에 대해선 대부분 디바운스 처리를 해주었다.

### 반응형

모든 페이지는 전부 미디어쿼리로 반응형을 진행했다. 반응형을 조금 쉽게하기 위해 %,vh,vw등을 적극 활용했고 확실히 필요한 곳 빼고 px는 최대한 피했다. 

### 배포

* 배포한 호스팅서비스와 그 이유
    - react(aws s3, cloudfront 배포) -https가 무료였고 사용하기 편했다.
    - nodejs(aws ec2,ubuntu 18.04 배포) -서버 초기단계부터 내가 직접 해보고 싶었다.
    - mysql(digitalocean,ubuntu 18.04 배포) -학생인 나에게 비용이 저렴했고 언어의 장벽 빼곤 사용하기 편했다.
   
aws를 처음 사용해보았기 때문에 재미있었고 어렵기도 했다. 배포한 직후 cors 이슈 때문에 통신이 안될 땐 힘들었다.

cors 이슈는 express의 cors라이브러리를 사용하여 해결했다.

### 사이트 보안

cloudfront덕분에 react측은 ssl인증서를 발급받을 필요가 없었지만 ec2는 달랐기 때문에 ssl인증서를 받기위해서
let's encrypt를 통해서 ssl인증서를 무료로 발급 받아 자동갱신을 해주었다.

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
