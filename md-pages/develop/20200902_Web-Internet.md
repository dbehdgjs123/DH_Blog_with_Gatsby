---
title: "웹, 그리고 인터넷"
date: "2020-09-02"
tags: ["internet", "web"]
---

**🎩알면 기술 모르면 마법이다.**

**위 문장은 내가 생활코딩을 보면서 보았던 가장 인상깊었던 말이다. 뭔가, 뼈를 정통으로 맞은 듯한 그런 충격을 받았다. 나와 같은 사람들은 생각보다 많을 것이다.**

**어떤 언어를 사용하거나 Framework를 사용할때 그 것의 본질적인 것들, 원리는 알면서 개발하는가?**

_내 생각에 여기에 예라고 대답한다면 그 사람은 프로그래머다. 하지만, 아니요라고 대답한다면 그 사람은 그냥 코더이다. 나는 아니요라고 대답했다. 그렇기 때문에 나는 코더다. 내 꿈은 코더가 아니라 프로그래머다. 때문에 여기에 대답을 예라고 할 수 있도록 기초공부도 틈틈이 해둬야겠다는 생각이 들어서 블로그에 정리를 해보고자 한다.._

### ⚙️서버와 클라이언트

사용자가 보는 웹페이지를 만들기 위해서는 기본적으로 두 개의 컴퓨터가 필요하다.

한 컴퓨터는 웹 브라우저용 컴퓨터, 또 다른 컴퓨터는 웹 서버용 컴퓨터. 기본 방식은 정말 단순하다. 클라이언트(웹브라우저용 컴퓨터) 에서 웹서버로 무언가 요청을 하고, 요청을 받은 웹서버에서 그 데이터를 응답해주는 것이 기본적인 구동원리이다.

간단하다.

클라이언트는 요청을하고 웹서버에서는 응답한다. 여기서, 클라이언트는 왜 클라이언트이고,서버는 왜 서버일까? 영어 그대로다. 클라이언트는 사용자,소비자다. 서버라는 말은 서비스를 제공하는 사람. 즉, 제공자로서 쉽게 말한 것이다.

### 📡웹호스팅과 웹서버

**내가 만들고 잘 가공한 정보가 있다. 그 좋은 데이터를 공유하고 싶은 사람은 분명히 있을 것이다. 어떻게 공유를 할까?**

첫 번째 방법은, 자신의 컴퓨터에 직접 웹서버를 설치하는 것이다.

웹서버를 직접 구축하고 컴퓨터에 설치한다는 것은 어렵다. 하지만 그만큼 개념을 많이 배울 수 있을 것이다.

두 번째 방법은, 웹호스팅이다. 웹서버를 구축하고 컴퓨터에 설치하고.. 이런 복잡한 과정들을 대행하는 회사에게 맡기는 것이다.

말 그대로 매우 쉽다. 하지만 작동방식들과 개념들은 알 수가 없을 것이다.

어떤게 좋을까는 우리가 고르는 것이다!

#### 📡웹 호스팅

첫 번째 방법이다. 가장 편하고 쉬운 방법인 호스팅

웹서버를 사용하기 위해서는 웹서버를 위한 컴퓨터가 있어야한다. 그리고 집에 있는 냉장고처럼 24시간 구동되어야한다.

컴퓨터가 터지면 알아서 고쳐야하고 그동안 클라이언트는 사용을 못하게 될 것이다. 때문에 이런 웹서버용 컴퓨터 즉, 호스트를 빌려주는 웹호스팅 업체들이 생겨난다.

그 중에서 가장 유명하고 무료면저 쉬운 서비스는 개발자들의 성지라고 할 수 있는 **깃허브** 이다.

웹 호스팅에 대해 더 알고 싶으면 구글링을 해보자!

#### 📲웹서버

두 번째 방법으로, 어렵지만 배울 것이 많다!

유명한건 많지만 그중에도 많이 유명한건 **아파치** 라는 소프트웨어가 있다. 오픈소스이며 대단하다.

자세한건 구글링을 해보자!

### 🤙🏻웹서버와 http

항상 주소를 입력하면 앞에 http라고 하는 것이 딸려온다. 이것은 무엇일까? 단순 치장은 아니다.

http란 웹브라우저와 웹서버가 통신하기위해 정해둔 일종의 통신 규약이다. 영어로 말하자면,

**H**yper **T**ext **T**ransfer **P**rotocal 이다.
이걸 해석하면 **H**yper **T**ext는 웹페이지 , **T**ransfer는 전송, **P**rotocal은 규약이다.

http에 대해서는 공부할게 아주 많고 정보도 많으므로 앞으로 차차 포스팅하도록 하겠다.

### 👨🏻‍💻웹서버와 웹브라우저의 통신

컴퓨터가 두 대 있다고 가정하자. 아까 말한데로 클라이언트 컴퓨터, 웹서버 컴퓨터 말이다.

만약에, 웹브라우저를 구동하는 컴퓨터에서 웹서버에 있는 index.html파일을 불러오고 싶으면 어떻게 할까? 당연한거지만 웹서버의 ip주소가 필요하다. _ex) 192.168.0.1_

만약 자신의 컴퓨터에서 접근한다면 127.0.0.1로 접근이 가능하다. 이것은 localhost 즉, 자기 자신의 컴퓨터를 뜻하는거다. 전세계에 있는 모든 컴퓨터는 이 주소로 자신의 로컬호스트로 접근이 가능하다.

모르고 사용하는 것과 알고 사용하는 것은 엄연히 다르다. 그러니까 기초도 틈틈히! 공부하도록하자.

그럼 오늘도
**_👍🏻just do it!_**