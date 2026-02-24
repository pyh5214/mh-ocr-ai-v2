# MH OCR AI - Flow 정리

> Figma 파일: https://www.figma.com/design/0FTlAIr64ggk2PWpIGjqtn/MH-OCR-AI--%EB%B3%B5%EC%82%AC-

---

## 화면 목록

| 화면명 | Node ID |
|--------|---------|
| AI OCR & LLM Extraction Landing Page | `1:5251` |
| File Management & Sub Main | `1:8516` |
| File Management & New File Upload Start | `1:8094` |
| File Management & New File Upload Select | `1:6828` |
| File Management & Version Update_stat | `1:7958` |
| File Management & Version Update_File Select | `1:8204` |
| File Management & OCR Trigger | `1:5394` |
| File Management & OCR Processing | `1:5659` |
| OCR Detailed Result Viewer | `1:6020` |
| Analytics Dashboard Overview | `1:7583` |
| Analytics Dashboard Sub Main | `1:7237` |
| Analytics Dashboard working | `1:9240` |
| file delete confirm | `1:6936` |
| file initialize confirm | `1:4950` |
| Edit File Metadata | `1:5532` |
| 시스템 사용이력 상세 조회 | `1:5828` |

---

## Flow

### 1. 메인 네비게이션

```
Landing Page (1:5251)
    ├─ [파일 관리] → File Management & Sub Main (1:8516)
    ├─ [통계] → Analytics Dashboard Overview (1:7583)
    └─ [세팅] → 설정 화면
```

---

### 2. 파일 관리 Flow

```
File Management & Sub Main (1:8516)
    │
    ├─ [새 업로드] → File Management & New File Upload Start (1:8094)
    │       │
    │       └─ 파일 선택 → File Management & New File Upload Select (1:6828)
    │               ├─ [취소] → File Management & Sub Main
    │               └─ [업로드 시작] → Toast → File Management & Sub Main
    │
    ├─ [버전 업데이트] → File Management & Version Update_stat (1:7958)
    │       │
    │       └─ 파일 선택 → File Management & Version Update_File Select (1:8204)
    │               ├─ [취소] → File Management & Sub Main
    │               └─ [업로드 시작] → Toast → File Management & Sub Main
    │
    ├─ [OCR 추출] → File Management & OCR Trigger (1:5394)
    │       │
    │       └─ [OCR 텍스트 추출 시작] → File Management & OCR Processing (1:5659)
    │               ├─ [프로세스 취소] → File Management & Sub Main
    │               └─ 완료 → OCR Detailed Result Viewer (1:6020)
    │
    └─ [편집 ✏️] → Edit File Metadata (1:5532)
            ├─ [취소] → 모달 닫기
            └─ [저장] → Toast → 모달 닫기
```

---

### 3. 통계 대시보드 Flow

```
Analytics Dashboard Overview (1:7583)
    │
    └─ 상세 → Analytics Dashboard Sub Main (1:7237)
                │
                └─ 활동 내역 → Analytics Dashboard working (1:9240)
```

---

### 4. 설정 Flow

```
설정 화면
    │
    ├─ [삭제] → file delete confirm (1:6936)
    │       ├─ [취소] → 모달 닫기
    │       └─ [삭제 실행] → Toast → 목록 갱신
    │
    └─ [데이터 초기화] → file initialize confirm (1:4950)
            ├─ [취소] → 모달 닫기
            └─ [초기화 실행] → Toast → 데이터 초기화
```

---

### 5. 모달/팝업

| 모달 | Node ID | 트리거 | 확인 | 취소 |
|------|---------|--------|------|------|
| file delete confirm | `1:6936` | 삭제 버튼 | 삭제 실행 | 취소 |
| file initialize confirm | `1:4950` | 데이터 초기화 버튼 | 초기화 실행 | 취소 |
| Edit File Metadata | `1:5532` | 편집 아이콘 | 저장 | 취소 |

---

### 6. Toast 메시지

- 파일 업로드 완료
- 버전 업데이트 완료
- OCR 추출 완료
- 파일 삭제 완료
- 데이터 초기화 완료
- 변경사항 저장 완료
