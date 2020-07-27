---
title: "상태관리-3(투두리스트)"
date: "2020-07-28"
tags: ["react", "redux"]
---

**리덕스를 실제 투두리스트 프로젝트에 적용해볼 시간이다. 막상 리덕스까지는 이해하기 쉬웠을 수도 있다. (컨텍스트api를 써봤다는 전제하에.)**

### 리듀서모듈

저번에 가장 먼저 만들어야 했던 리듀서 모듈 코드를 먼저 살펴보자.

```javascript
// modules/user.js
//액션
const INPUT_CHANGE = "user/INPUT_CHANGE";
const CREATE_TODO = "user/CREATE_TODO";
const EDIT_TODO = "user/EDIT_TODO";
const DELETE_TODO = "user/DELETE_TODO";

let id = 0; //todo item 고유 아이디

//액션 생성함수
export const onChangeHandler = todo => {
  return {
    type: INPUT_CHANGE,
    data: todo,
  };
};
export const onCreate = () => {
  return {
    type: CREATE_TODO,
  };
};
export const onEdit = (data, id) => {
  return {
    type: EDIT_TODO,
    data,
    id,
  };
};
export const onDelete = id => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const initialState = {
  AddTodo: "",
  NowTodo: [],
};

//리듀서
export default function user(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        AddTodo: action.data,
      };

    case CREATE_TODO:
      console.log("호출");
      return {
        AddTodo: "",
        NowTodo: state.NowTodo.concat({ todo: state.AddTodo, Id: id++ }),
      };

    case EDIT_TODO:
      return {
        ...state,
        NowTodo: state.NowTodo.map(item =>
          item.Id === action.id ? { todo: action.data, Id: action.id } : item
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        NowTodo: state.NowTodo.filter(item => item.Id !== action.id),
      };

    default:
      return state;
  }
}
```

이런식으로 만들어져 있다. ducks 패턴을 사용하여 액션과 액션생성함수, 그리고 리듀서까지 한 번에 줬다. 이렇게 한 파일에 모두 작성하는 것이 ducks패턴의 장점이다.

### export

잠깐 짚고 넘어가야할 부분이 있다. 도대체 export는 무엇일까? 모르는 사람을 위해 설명하겠다. 설명할 것도 없이 그냥 내보내기 라는 뜻이다.

```javascript
export const a = 1; //내보내야

import { a } from "./your path!!"; //불러올 수 있겠지?
```

### export default

export는 알겠는데.. export default는 무엇일까? 이것도 그냥 내보내기이다. default가 기본값이다. export와 다른 점은 임포트 해올때 꼭 그 이름으로 안가져와도 된다. 즉 사용자 정의 변수로 가져와도 된다는 뜻이다.

```javascript
export default const a = 1; //내보내면

import wow from "./your path!!" //아무 이름이나 되겠지?
```

### 스토어

이제 다 만들었으면 스토어를 만들어야할 차례이다. 이렇게 만들어 놓고 안쓰면 쓸모 없는 메모리 낭비니까 말이다.

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import user from "./modules/user"; //두 개 이상이면 combindereducer로 합칠 수 있다. 그러면 modules까지만 적어줘도됨.
import { Provider } from "react-redux";
const store = createStore(user);
console.log(store.getState()); //만든 스토어에서 state를 조회하는 메서드다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

원래 리듀서가 많으면 combineReducer라는 메서드를 사용해서 합칠 수 있겠지만 나는 user리듀서 하나이므로 그냥 쓰겠다.

위와 같이 APP컴포넌트를 리덕스의 기능인 Provider로 감싸주고 스토어를 사용하게끔 createStore를 해줘야 렌더링 되는 모든 컴포넌트가 스토어를 쓸 수 있다.

```javascript
const store = createStore(내가 만든 리듀서);
```

요로코롬 자기가 만든 리듀서를 createStore의 인자로 넣어주면 완성이다.

자 준비가 끝났다. 이제 사용하기만 하면 된다!!

### 컴포넌트

나 같은 경우는 app,todolist,todo 총 세가지로 컴포넌트를 나눠썼다. 더 분리할 수 있지만 큰 프로젝트가 아니라 이정도로 나눴다.

App.js

```javascript
import React from "react";
import List from "./components/List";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { onChangeHandler, onCreate, onEdit, onDelete } from "./modules/user";

function App() {
  const { AddTodo, NowTodo } = useSelector(state => state);
  const dispatch = useDispatch();

  const onInputHandler = e => {
    dispatch(onChangeHandler(e.target.value));
  };

  const onsubmitHandler = () => {
    if (AddTodo !== "") {
      dispatch(onCreate());
    } else {
      console.log("값을 입력하세요");
    }
  };

  return (
    <div className="page">
      <div className="input_box">
        <input
          className="input_bar"
          type="text"
          value={AddTodo}
          onChange={onInputHandler}
        />
        <button type="button" className="input_btn" onClick={onsubmitHandler}>
          추가
        </button>
      </div>

      <List data={NowTodo} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
```

스토어를 전역으로 사용하기 때문에 위 코드처럼 스토어에 접근도 가능하고 디스패치도 사용할 수 있다. 이것 참 편리하지? (사실 여기선 못느낀다. 오히려 더 복잡해질 수도..)

```javascript
const { AddTodo, NowTodo } = useSelector(state => state); //인자로 함수가 들어간다.
const dispatch = useDispatch();
```

위 코드에서 useSelector를 사용하면 안에 있는 store의 상태에 접근할 수 있다. hooks가 나오기 전에는 이런 기능들이 없어서 connect도 해주고 그래야 했는데 hooks가 나오며 함수형 컴포넌트의 시대가 와서 쓰기 편해졌다.

useDispatch를 사용하면 이제 리덕스의 기능인 디스패치를 사용할 수 있다. 리덕스의 작동 순서가 기억 안난다면 저번에 올린 글을 보자.

그리고 {AddTodo, NowTodo } 이건 생소할 수도 있는데 비구조할당이다. 궁금하면 구글에 치면 잘 나와있다.

간단하게 설명하자면 무언가 객체나 배열안에 있는 값을 접근할때 안에 있는걸 미리 꺼내서 사용할 수 있는 것이다. 별 거 아닐 수 있겠지만 코드가 정말 깔끔해진다.

ex)

```javascript
const a = useSelector(state => state); // a.ADDToDo , a.NowTodo 처럼 매번 이렇게 가져와야 한다.

const { AddTodo, NowTodo } = useSelector(state => state); // 요렇게 미리 꺼내서 저장하면 깔끔하게 안의 프로퍼티만 빼서 쓸 수 있다.
```

자, 디스패치도 어디서나 저렇게 쓸 수 있고 state도 어디서나 저렇게 조회할 수 있다. 이걸로도 리덕스는 많은 기능을한다. 나머지 컴포넌트를 보자.

List.js

```javascript
import React from "react";
import "../List.css";
import Todo from "./Todo";
function List(props) {
  if (props.data === "") return;

  let list = props.data.map(items => (
    <Todo data={items.todo} key={items.Id} id={items.Id} />
  ));

  return <div className="list">{list}</div>;
}

export default List;
```

app컴포넌트의 하위 컴포넌트인 list는 원래 아이템을 출력해주는 역할만 해야하는데 리덕스를 사용하지 않을경우 삭제와, 수정 함수를 모두 props로 내려줘야했다.

ex)

```javascript
let list = props.data.map(items => (
  <Todo
    data={items.todo}
    key={items.Id}
    id={items.Id}
    onDelete={onDelete}
    onEdit={onEdit}
  /> //컴포넌트 하나 렌더링하는데 정말 길어진다.
));
```

이렇게 말이다. 하지만 이제 이럴 필요가 없다.

Todo.js

```javascript
import React from "react";
import { useState } from "react";
import "../todo.css";
import { useDispatch } from "react-redux";
import { onEdit, onDelete } from "../modules/user";

function Todo({ data, id }) {
  const [Todo, setTodo] = useState({
    todoText: "",
    isEdit: false,
  });
  const dispath = useDispatch(); //리덕스 디스패치

  const { todoText, isEdit } = Todo;

  const onEditHandler = () => {
    dispath(onDelete(id));
  };

  const EditHandler = () => {
    if (isEdit) {
      setTodo({
        todoText: todoText,
        isEdit: !isEdit,
      });
      dispath(onEdit(todoText, id));
    } else {
      setTodo({
        todoText: data,
        isEdit: !isEdit,
      });
    }
  };

  const onChangeHandler = e => {
    setTodo({
      ...Todo,
      todoText: e.target.value,
    });
    console.log(todoText);
  };
  return (
    <div className="todo_item">
      {isEdit ? (
        <>
          <input type="text" value={todoText} onChange={onChangeHandler} />
          <button onClick={EditHandler}>완료</button>
        </>
      ) : (
        <>
          <h3>{data}</h3>
          <button onClick={EditHandler}>수정</button>
        </>
      )}
      <button onClick={onEditHandler}>삭제</button>
    </div>
  );
}

export default Todo;
```

이 최하위 컴포넌트에서도 useDispath를 통해 디스패치를 사용할 수 있기때문에 자신의 아이디 값과 data가 있으니 디스패치로 넘겨주기만 하면 된다.

아주 멋있지? 무려 중간 과정이 없어졌다.

아직 미숙하지만 쉽게 쉽게 설명하기엔 역시 무리가 있다. 리덕스는 어려우니까 말이다.. 끈임없이 구글링하고 찾아봐야한다. 필자는 리덕스도 어렵지만 미들웨어를 쓰는데 정말 힘들어했다.

투두리스트같은 프로젝트는 크지 않아서 더 복잡해지는게 맞다. 하지만 이걸 보고 있으신 분들이나 필자를 비롯해서 여기서 끝내면 안된다. 더 멋있고 유능한 그런 개발자가 되려면 훨씬 어려운 것들도 감수해야한다.

내가 처음 리액트를 배웠을땐 정말 무지막지하게 어려웠다. 지금도 쉽다는건 아니다. 하지만 누구나 그렇듯이 익숙해지기 마련이다. 힘내자.

그럼 오늘도
**_just do it!_**
