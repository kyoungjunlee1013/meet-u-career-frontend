# 🚀 Meet U, Career - Frontend (Next.js)

Spring Boot 기반 커리어 매칭 플랫폼 'Meet U, Career'의 **프론트엔드(Next.js)** 프로젝트입니다.

이 프로젝트는 실제 서비스 수준의 커리어 매칭 플랫폼 구현을 목표로 기획 및 개발되었습니다. 
총 6명의 팀원이 백엔드와 프론트엔드를 분리하여 협업하였으며, 실무 수준의 웹 애플리케이션 개발 경험을 쌓았습니다.

---

## 📌 프로젝트 개요
| 항목         | 설명                        |
|--------------|-----------------------------|
| 프로젝트명   | Meet U, Career              |
| 개발 기간    | 2025.03 ~ 2025.04           |
| 팀 구성      | 총 6인 (팀 하이파이브)      |
| 개발 방식    | 백엔드 / 프론트엔드 분리    |
| 주요 기능    | 이력서 관리, 채용 공고 조회 및 지원, 기업 회원 관리, 관리자 대시보드 등 |
| 기술 스택    | Next.js, React, TypeScript, Tailwind CSS, Docker, AWS, GitHub Actions 등 |

---

## ⚙️ 기술 스택 및 아키텍처

### 🔧 사용 기술
- **Frontend Framework:** Next.js 15.x (App Router)
- **UI/UX:** React, Tailwind CSS, Headless UI
- **상태 관리:** React Query, Zustand
- **API 통신:** Axios, RESTful API
- **배포/인프라:** Docker, AWS EC2, Nginx, GitHub Actions
- **문서화:** Storybook, Figma
- **IDE:** VS Code
- **협업 도구:** Jira, Confluence, Slack, Figma

| 분류         | 기술 스택                                   |
|--------------|---------------------------------------------|
| 프론트엔드   | Next.js, React, TypeScript, Tailwind CSS    |
| 백엔드       | Spring Boot, JPA, QueryDSL, JWT, MySQL      |
| 데이터베이스 | MySQL (Oracle Cloud)                        |
| 문서화       | Swagger, Storybook                          |
| 인프라/배포  | Docker, Nginx, AWS EC2, GitHub Actions      |
| 개발 환경    | VS Code, IntelliJ IDEA                      |
| 협업 도구    | Jira, Confluence, Slack, Figma, Notion      |

---

## 🧩 아키텍처 개요

```
[Frontend (Next.js)] ⇄ [Backend (Spring Boot)]
                          ↳ DB: MySQL (Oracle Cloud)
                          ↳ CI/CD: Docker, GitHub Actions
                          ↳ 배포: AWS EC2
```

---

## 👥 팀원
- 모든 팀원이 GitHub를 통해 브랜치 전략(git flow)을 적용하며 협업했습니다.
- 프론트엔드/백엔드 분리 개발, 코드 리뷰 및 PR 기반 협업

---

## 💬 기술적 의사결정 사유 (Frontend)
| 사용 기술      | 선택 사유 및 설명 |
|----------------|------------------|
| Next.js        | SSR/SSG/CSR 등 다양한 렌더링 방식 지원, SEO 최적화, 파일 기반 라우팅 |
| Tailwind CSS   | 빠른 UI 개발, 디자인 시스템 구축에 용이 |
| React Query    | 서버 상태 관리, 데이터 캐싱, 비동기 처리 최적화 |
| Docker         | 개발/운영 환경 일관성, 배포 자동화 |
| GitHub Actions | CI/CD 파이프라인 구축, 자동 테스트/배포 |
| Nginx          | 리버스 프록시 및 정적 파일 서빙 |

---

## 📂 주요 폴더 구조

```
meet-u-frontend/
├── app/                # Next.js App Router 기반 페이지
│   └── ...
├── components/         # 공통/도메인별 UI 컴포넌트
├── hooks/              # 커스텀 훅
├── libs/               # API, 유틸 함수 등
├── public/             # 정적 파일
├── styles/             # 글로벌 스타일(Tailwind 등)
├── conf/               # Nginx 등 배포 관련 설정
├── Dockerfile          # 프론트엔드용 Dockerfile
├── docker-compose.yml  # 전체 서비스 도커 컴포즈
└── ...
```

---

## 🧪 실행 및 배포 방법

### 1. 로컬 개발
```bash
npm install
npm run dev
```

### 2. Docker 컨테이너 실행 (SSR)
```bash
docker-compose up --build
```
- Nginx가 80번 포트, Next.js가 3000번 포트에서 동작합니다.
- SSR(서버 사이드 렌더링) 방식으로 운영됩니다.

### 3. 환경 변수 설정
- `.env` 파일에 API 서버 주소 등 환경 변수 작성

### 4. 주요 경로
- http://localhost (Nginx 프록시)
- http://localhost:3000 (Next.js 직접 접근)

---

## ✨ 커밋 메시지 규칙 (Conventional Commits)
| 타입      | 설명                       | 예시 |
|-----------|----------------------------|------|
| feat      | 새로운 기능 추가           | feat: 로그인 페이지 구현 |
| fix       | 버그 수정                  | fix: 회원가입 에러 수정 |
| refactor  | 리팩토링                   | refactor: 코드 구조 개선 |
| docs      | 문서 수정                  | docs: README 업데이트 |
| style     | 코드 스타일 변경           | style: 불필요한 공백 제거 |
| test      | 테스트 코드 추가           | test: 로그인 테스트 추가 |
| chore     | 빌드/설정/환경 등 기타     | chore: 패키지 업데이트 |
| WIP       | 작업중                     | WIP: 다크모드 기능 구현 중 |

---

## 🚀 배포 방식
- GitHub Actions를 통해 main 브랜치 푸시 시 Docker 이미지 빌드 및 EC2 자동 배포
- Nginx 리버스 프록시 + Next.js SSR 구조

---

## 🤝 협업 및 관리 방식
- GitHub Projects: 칸반 보드로 이슈/태스크 관리
- Figma: UI/UX 설계
- Notion: 회의록, 기획서, API 명세서 공유
- Slack/Jira/Confluence: 커뮤니케이션 및 일정 관리

---

## 📎 기타
- 백엔드 레포지토리: [meet-u-career-backend](https://github.com/dpdlcl01/meet-u-career-backend)
- 프론트엔드 레포지토리: [meet-u-career-frontend](https://github.com/dpdlcl01/meet-u-career-frontend)

---

문의 및 이슈는 GitHub Issue를 활용해 주세요.
