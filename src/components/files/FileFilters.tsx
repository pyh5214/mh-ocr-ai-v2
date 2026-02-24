"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { Search, Check, Calendar } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FileFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: Record<string, boolean>) => void;
}

export function FileFilters({ onSearch, onFilterChange }: FileFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilters, setFileTypeFilters] = useState<FilterOption[]>([
    { id: "all", label: "전체 파일", checked: true },
    { id: "my", label: "내 파일", checked: false },
  ]);
  const [statusFilters, setStatusFilters] = useState<FilterOption[]>([
    { id: "ocr", label: "OCR 추출", checked: false },
    { id: "completed", label: "완료됨", checked: true },
    { id: "processing", label: "작업중", checked: false },
  ]);

  const toggleFileType = (id: string) => {
    setFileTypeFilters((prev) =>
      prev.map((f) => ({ ...f, checked: f.id === id }))
    );
  };

  const toggleStatus = (id: string) => {
    setStatusFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  return (
    <div className="flex items-center gap-6 py-5 px-5 border-b border-[#f3f4f6]">
      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="파일명 또는 작업자 검색"
          className="pl-10 h-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-[#f3f4f6]" />

      {/* File Type Filters */}
      <div className="flex items-center gap-2">
        {fileTypeFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFileType(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
              filter.checked
                ? "bg-[#137fec] text-white"
                : "bg-white border border-[#e5e7eb] text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter.checked && <Check className="w-3.5 h-3.5" />}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleStatus(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
              filter.checked
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-white border border-[#e5e7eb] text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter.checked && <Check className="w-3.5 h-3.5" />}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-[#f3f4f6]" />

      {/* Date Filter */}
      <Button variant="outline" className="gap-2">
        <Calendar className="w-4 h-4" />
        기간 설정
      </Button>
    </div>
  );
}
