# AI TOM — 한국가스기술공사 사용자 서비스 프로토타입 (v2)

한국가스기술공사 생성형 AI 플랫폼의 **사용자 서비스(AI TOM)** 프로토타입입니다.
기획서 기준으로 단일 채팅 중심 UI에 RAG·다중 에이전트·구조화 응답을 통합한 형태입니다.

> 본 브랜치(`user-service-v2`)는 기존 `kogas-genos-prototype` 의 사용자 서비스만 재설계한 별개 배포입니다.

## 데모

| 버전 | URL | 비고 |
|---|---|---|
| **AI TOM (v2, 본 저장소)** | https://hyegeungim3-git.github.io/kogas-tom-ai/ | 신규 디자인 |
| 기존 통합 콘솔 (v1) | https://hyegeungim3-git.github.io/kogas-genos-prototype/ | 관리자 + 다중 페이지 서비스 |

기본 진입은 **AI TOM 사용자 서비스**입니다.
좌측 사이드바 하단의 "관리자 콘솔" 버튼으로 기존 관리자 페이지(그대로 보존)도 확인할 수 있습니다.

## 주요 화면

### 01. 텍스트 생성 및 대화
- 멀티 에이전트 선택 (좌측 "에이전트" 탭)
- 다중 응답 모드 / 사용 모델 선택 (입력바 인라인: RAG · Smart Auto · GPT-OSS 등)
- 환각 최소화를 위한 RAG 기반 답변
- 세션별 챗 히스토리 유지 (좌측 대화 목록 — 오늘/최근 7일/이전)

### 02. 지능형 질의-응답
- 멀티턴 대화 및 히스토리 관리 (고정·삭제·검색)
- 사내 문서 참조 후 답변 — **참조 문서 하이라이팅** (우측 패널)
- **답변 근거 문서 링크 및 다운로드** (미리보기 / 다운로드 버튼)
- 문장 형태와 질의 맥락을 파악한 자료 요약

### 03. 응용 기능 (채팅 통합)
- **보고서 생성**: 처리 단계 표시 → 마크다운 초안 → PDF 카드 (문서 미리보기·다운로드)
- **시장 분석**: 표 형식의 Executive Summary 자동 작성
- **번역·요약**: 한국어↔외국어, 긴 문서 요약
- **개인 지식DB**: 마이페이지 모달에서 관리

## 데모용 샘플 질문

빈 화면에서 4개 프롬프트 카드를 누르거나, 직접 입력해 보세요. 입력 키워드에 따라
다른 형태의 응답이 자동으로 매칭됩니다.

| 입력 예시 | 응답 형태 |
|---|---|
| "PSV 정기 점검 주기는?" | RAG 답변 + 우측 참조자료 패널 (평택기지_정비_지침.pdf 하이라이팅) |
| "최근 기술전 임직원 만족경험 조사 시장 분석해줘" | Executive Summary 표 |
| "이번 주 PSV 점검 5건 처리 결과 주간 실적 보고서로 작성해줘" | 처리 단계 + 마크다운 초안 + 다운로드 가능한 PDF 카드 |
| (그 외) | 일반 텍스트 응답 |

## 기술 스택

- React 19 + Vite 7 + Tailwind CSS 4
- lucide-react
- 단일 파일 프로토타입 (백엔드 없음 / 모든 데이터 Mock)

## 로컬 실행

```bash
cd genos-app
npm install
npm run dev
```

기본 포트: `http://localhost:5173/kogas-tom-ai/`

## 빌드 / 배포

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 워크플로우가 자동으로
`genos-app/dist/` 산출물을 GitHub Pages에 배포합니다.

## 디렉터리 구조

```
.
├── .github/workflows/deploy.yml
├── genos-app/
│   ├── src/App.jsx              # 전체 UI (AITomChat 포함 단일 파일)
│   └── vite.config.js           # base: /kogas-tom-ai/
└── NanumSquareNeo-*.ttf
```

## 라이선스

프로토타입 데모 목적이며, 폰트·KOGAS 관련 명칭은 각 권리자에게 귀속됩니다.
