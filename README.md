# 유플러스 댕댕어디가 프로젝트
반려동물과 함께하는 외출 지원 서비스

---

## 서비스 소개
반려동물과 함께 외출할 수 있는 시설 정보를 공유함으로써, 견주들이 보다 편리하고 쾌적하게 외출을 즐길 수 있도록 돕습니다. 이를 통해 반려동물과 함께하는 활동의 범위가 넓어지고, 외출 시의 부담을 줄여주는 서비스를 제공합니다.

---

## 디렉토리 구조
```plaintext
src/
├── components/      // UI 컴포넌트
│   └── common/      // 공통 컴포넌트
├── pages/           // 페이지 단위 컴포넌트
├── hooks/           // 커스텀 훅
├── stores/          // Zustand 스토어 파일
├── utils/           // 유틸리티 함수
├── data/            // 더미데이터
├── routes/          // 라우트 관련
├── stories/         // 스토리북 파일
├── style/           // 스타일 관련 (CSS 등)
├── services/        // API 요청 및 데이터 처리
└── assets/          // 이미지, 폰트 등 정적 리소스
    └── icons/       // icon 파일
```
---
## 서버 실행 방법

1. 프로젝트 디렉토리로 이동합니다.
   ```bash
   cd 프로젝트_디렉토리
   ```
2. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```
3. 서버를 실행합니다.
   ```bash
   npm run dev
   ```
4. 브라우저에서 아래 주소로 접속합니다.
   ```bash
   http://localhost:5173
   ```
---
# 서비스 세부 기능

## 📍 장소 검색 시스템
- 반려동물 동반 가능 시설 목록을 제공한다.
- 사용자는 위치 기반 또는 키워드로 장소를 검색할 수 있다.
- 검색 결과를 필터링할 수 있는 기능을 제공한다.

## 💖 즐겨찾기 시스템
- 반려동물 동반 가능 시설을 즐겨찾기에 추가할 수 있다.
- 즐겨찾기한 시설 목록을 조회할 수 있다.

## ⭐ 리뷰 시스템
- 사용자는 시설에 대한 리뷰를 남길 수 있다.
- 리뷰와 함께 별점을 평가할 수 있는 기능을 제공한다.

## 🐶 반려견 정보 관리 시스템
- 사용자는 자신의 반려견 프로필을 등록하고 관리할 수 있다.
- 반려견의 이름, 나이, 품종 등의 정보를 저장할 수 있다.

## 🔮 추천 시스템
- 사용자의 거주지 및 부가 정보를 기반으로 맞춤 시설을 추천한다.
- 추천 알고리즘을 통해 선호도가 높은 시설을 제안한다.

## 🏅 땅따먹기 시스템
- 정해진 구역 안의 시설들을 방문한 횟수를 기록한다.
- 기록된 방문 데이터를 기반으로 땅따먹기 서비스를 제공한다.
- 특정 조건을 만족하면 해당 구역을 점령할 수 있다.

---
## Commit 메시지 구조

```
💡 `type: subject`

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다
```

## Commit Type

```
이모지 = :코드:
```

| 타입         | 이모지 | 코드             | 설명                                                           | 예시                                                  |
| ------------ | ------ | ---------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| **feat**     | ✨     | sparkles         | 새로운 기능을 추가할 때 사용합니다.                            | `✨ feat: 로그인 폼 유효성 검사 추가`                 |
| **fix**      | 🐛     | bug              | 버그를 수정할 때 사용합니다.                                   | `🐛 fix: 로그인 버그 수정`                            |
| **style**    | 💄     | lipstick         | 사용자 인터페이스 관련 변경 사항.                              | `💄 style: 네비게이션 바 디자인 수정`                 |
| **refactor** | 🎨     | art              | 버그 수정이나 기능 추가 없이 코드 구조를 개선할 때 사용합니다. | `🎨 refactor: 컴포넌트 상태 관리 로직 단순화`         |
| **perf**     | ⚡     | zap              | 성능을 개선하는 코드 변경.                                     | `⚡️ perf: 이미지 로딩 시간 최적화`                   |
| **test**     | ✅     | white_check_mark | 테스트 코드를 추가하거나 수정할 때 사용합니다.                 | `✅ test: 버튼 컴포넌트에 대한 단위 테스트 추가`      |
| **docs**     | 📝     | memo             | 문서만 변경할 때 사용합니다.                                   | `📝 docs: 설치 단계 README에 추가`                    |
| **chore**    | 🔧     | wrench           | 소스나 테스트 파일을 수정하지 않는 일반적인 작업이나 업데이트. | `🔧 chore: 종속성 패키지 업데이트`                    |
| **revert**   | ⏪     | rewind           | 이전 커밋을 되돌릴 때 사용합니다.                              | `⏪ revert: "로그인 폼 유효성 검사 추가" 커밋 되돌림` |
| **init**     | 🎉     | tada             | 프로젝트 초기 설정 시 사용합니다.                              | `🎉 init: React 프로젝트 초기 설정`                   |
| **delete**   | 🔥     | fire             | 코드/파일 삭제.                                                | `🔥 delete: 안 쓰는 로그인 컴포넌트 삭제`             |
| **wip**      | 🚧     | construction     | 작업 중이거나 실험적인 변경 사항.                              | `🚧 wip: 새로운 인증 방법을 실험 중`                  |

[참고](https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

[깃모지 사용법](https://treasurebear.tistory.com/70)
