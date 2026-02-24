"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Button, Badge, Input } from "@/components/ui";
import {
  Download,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type ActionType = "로그인" | "파일 업로드" | "파일 삭제" | "OCR 추출" | "파일 다운로드" | "버전 업데이트" | "권한 변경";

interface HistoryItem {
  id: string;
  userId: string;
  actionType: ActionType;
  timestamp: string;
}

const actionTypeColors: Record<ActionType, { bg: string; text: string }> = {
  "로그인": { bg: "bg-blue-50", text: "text-blue-700" },
  "파일 업로드": { bg: "bg-green-50", text: "text-green-700" },
  "파일 삭제": { bg: "bg-red-50", text: "text-red-700" },
  "OCR 추출": { bg: "bg-purple-50", text: "text-purple-700" },
  "파일 다운로드": { bg: "bg-amber-50", text: "text-amber-700" },
  "버전 업데이트": { bg: "bg-cyan-50", text: "text-cyan-700" },
  "권한 변경": { bg: "bg-pink-50", text: "text-pink-700" },
};

const mockHistoryData: HistoryItem[] = [
  { id: "1", userId: "alex.chen", actionType: "로그인", timestamp: "2023-10-15 14:32:45" },
  { id: "2", userId: "sarah.kim", actionType: "파일 업로드", timestamp: "2023-10-15 14:28:12" },
  { id: "3", userId: "alex.chen", actionType: "파일 삭제", timestamp: "2023-10-15 14:25:33" },
  { id: "4", userId: "mike.johnson", actionType: "OCR 추출", timestamp: "2023-10-15 14:20:18" },
  { id: "5", userId: "sarah.kim", actionType: "로그인", timestamp: "2023-10-15 14:15:45" },
  { id: "6", userId: "emily.park", actionType: "파일 다운로드", timestamp: "2023-10-15 14:10:22" },
  { id: "7", userId: "mike.johnson", actionType: "버전 업데이트", timestamp: "2023-10-15 14:05:55" },
  { id: "8", userId: "sarah.kim", actionType: "파일 업로드", timestamp: "2023-10-15 14:00:30" },
  { id: "9", userId: "alex.chen", actionType: "로그인", timestamp: "2023-10-15 13:55:18" },
  { id: "10", userId: "mike.johnson", actionType: "파일 삭제", timestamp: "2023-10-15 13:50:45" },
];

const filterOptions: ActionType[] = [
  "로그인",
  "파일 업로드",
  "파일 삭제",
  "OCR 추출",
  "파일 다운로드",
  "버전 업데이트",
  "권한 변경",
];

export default function SystemHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<ActionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (filter: ActionType) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredData = mockHistoryData.filter((item) => {
    const matchesSearch = item.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(item.actionType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />

      <main className="px-10 py-12">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">시스템 사용이력 상세 조회</h1>
            <p className="text-sm text-gray-500">
              시스템 내 모든 사용자 활동에 대한 상세 로그를 확인할 수 있습니다.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              리포트 다운로드
            </Button>
            <Button className="gap-2">
              <RefreshCw className="w-4 h-4" />
              이력 새로고침
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#f3f4f6] rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 w-20">필터 선택</span>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilters.includes(filter)
                      ? "bg-[#137fec] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="사용자 아이디 검색"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#f3f4f6] rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                  사용자 ID
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                  작업 유형
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                  작업 시간 (timestamp)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => {
                const colors = actionTypeColors[item.actionType];
                return (
                  <tr key={item.id} className="border-b border-[#f3f4f6] hover:bg-gray-50">
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={`${colors.bg} ${colors.text} border-none`}
                      >
                        {item.actionType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {item.timestamp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#f3f4f6]">
            <p className="text-sm text-gray-500">
              총 {filteredData.length}개 항목 중 1-10 표시
            </p>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50">
                <ChevronsLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded bg-[#137fec] text-white text-sm font-medium">
                1
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50 text-sm">
                2
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50 text-sm">
                3
              </button>
              <span className="px-2 text-gray-400">...</span>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50 text-sm">
                10
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50">
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-[#e5e7eb] hover:bg-gray-50">
                <ChevronsRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
