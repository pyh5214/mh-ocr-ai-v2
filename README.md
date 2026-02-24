# MH Nexus Frontend

사내 데이터를 업로드하여 관리하고 확인할 수 있는 플랫폼의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand, React Query
- **Form Management**: React Hook Form + Zod
- **Testing**: Vitest, Playwright, Testing Library

## 시작하기

### 환경 설정

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
```bash
cp .env.example .env.local
```

3. 개발 서버 실행:
```bash
npm run dev
```

### 개발 명령어

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - ESLint 실행
- `npm run test` - Unit/Integration 테스트 실행
- `npm run test:ui` - Vitest UI 실행
- `npm run test:coverage` - 테스트 커버리지 확인
- `npm run test:e2e` - E2E 테스트 실행
- `npm run test:e2e:ui` - Playwright UI 실행

