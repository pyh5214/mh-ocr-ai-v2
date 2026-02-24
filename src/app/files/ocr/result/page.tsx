"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Badge, Input } from "@/components/ui";
import {
  Search,
  Download,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface ExtractedItem {
  id: string;
  name: string;
  description: string;
  page: string;
  tags: string[];
  imageUrl: string;
}

const mockExtractedItems: ExtractedItem[] = [
  {
    id: "1",
    name: "1분기_매출_차트.png",
    description: "2023 회계연도 지역 부서별 분기별 매출 성장을 나타내는 선 그래프입니다.",
    page: "01",
    tags: ["REVENUE", "CHART", "TRENDS"],
    imageUrl: "/placeholder-chart-1.jpg",
  },
  {
    id: "2",
    name: "운영_통계_표.png",
    description: "비용 절감 지표 및 KPI 목표를 보여주는 상세 운영 효율성 표입니다.",
    page: "02",
    tags: ["OPERATIONS", "KPI"],
    imageUrl: "/placeholder-chart-2.jpg",
  },
  {
    id: "3",
    name: "기업_브랜딩_로고.png",
    description: "요약 보고서 헤더에서 추출된 주요 회사 로고입니다.",
    page: "03",
    tags: ["BRANDING", "LOGO"],
    imageUrl: "/placeholder-logo.jpg",
  },
  {
    id: "4",
    name: "클라우드_아키텍처_인포그래픽.png",
    description: "신경망 레이아웃 분석 파이프라인 및 데이터 흐름을 설명하는 아키텍처 다이어그램입니다.",
    page: "04",
    tags: ["ARCHITECTURE", "DIAGRAM"],
    imageUrl: "/placeholder-architecture.jpg",
  },
  {
    id: "5",
    name: "서버_팜_사진.jpg",
    description: "엔터프라이즈 데이터 센터 시설을 보여주는 12페이지의 스톡 사진입니다.",
    page: "05",
    tags: ["DATACENTER", "PHOTO"],
    imageUrl: "/placeholder-server.jpg",
  },
  {
    id: "6",
    name: "시장_점유율_그래프.png",
    description: "2024년 전망에 대한 경쟁사별 시장 점유율을 분석한 파이 차트입니다.",
    page: "06",
    tags: ["MARKET", "CHART"],
    imageUrl: "/placeholder-pie.jpg",
  },
];

const mockContextText = `본 문기 추출된 시각적 요소는 "invoice_q4_2023.pdf" 문서의 주요 분석 결과입니다. 차트, 표, 로고 및 기타 그래픽 요소가 자동으로 감지되어 추출되었습니다.`;

function OcrResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileId = searchParams.get("id") || "1";

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<ExtractedItem | null>(mockExtractedItems[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBack = () => {
    router.push("/files");
  };

  const handleNext = () => {
    router.push(`/files/edit?id=${fileId}`);
  };

  const filteredItems = mockExtractedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Custom Header for Result Viewer */}
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#137fec] rounded-md flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L2 6L9 10L16 6L9 2Z" fill="white" />
              <path d="M2 12L9 16L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900">MH OCR AI</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a href="/files" className="text-sm text-[#137fec] font-medium border-b-2 border-[#137fec] py-1">
            파일 관리
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">통계</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">세팅</a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-500">MHOCR</span>
          <span className="text-sm text-gray-600">MHOntology</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Alex Johnson</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full border border-[#e5e7eb]" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col border-r border-[#e5e7eb]">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">추출된 이미지</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="추출 데이터 검색..."
                  className="w-64 pl-3 pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* View Toggle */}
              <div className="flex border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
                >
                  <Grid3X3 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
                >
                  <List className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <Button className="gap-2">
                <Download className="w-4 h-4" />
                내보내기 (JSON)
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? "border-[#137fec] ring-2 ring-[#137fec]/20"
                      : "border-[#f3f4f6] hover:border-gray-300"
                  }`}
                >
                  {/* Image Preview */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      이미지 미리보기
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className="text-xs">
                        {item.tags[0]}
                      </Badge>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white">
            <Button variant="outline" className="gap-2" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">총 {filteredItems.length}개 항목</span>
              <div className="flex items-center gap-1 ml-4">
                <button className="w-8 h-8 rounded border border-[#e5e7eb] flex items-center justify-center text-sm">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded border border-[#e5e7eb] flex items-center justify-center text-sm">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded bg-[#137fec] text-white flex items-center justify-center text-sm font-medium">
                  1
                </button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 rounded border border-[#e5e7eb] flex items-center justify-center text-sm">
                  10
                </button>
              </div>
            </div>

            <Button className="gap-2" onClick={handleNext}>
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar - Detail Panel */}
        <div className="w-96 bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">상세 정보</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Search in Panel */}
            <div className="relative mb-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#f8f9fb] rounded-lg border border-[#e5e7eb]">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">선택 항목 분석 결과...</span>
              </div>
            </div>

            {selectedItem && (
              <div className="space-y-6">
                {/* Page Number */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">페이지 번호</p>
                  <p className="text-sm font-medium text-gray-900">{selectedItem.page}</p>
                </div>

                {/* AI Tags */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">AI 태그</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-blue-50 text-[#137fec] border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Connected Context */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">연결된 컨텍스트 텍스트</p>
                  <div className="bg-[#f8f9fb] border border-[#e5e7eb] rounded-lg p-3">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {mockContextText}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OcrResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <OcrResultContent />
    </Suspense>
  );
}
