"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Badge } from "@/components/ui";
import { FileText, Zap, ScanText, Table2, Database, Shield, Clock, ChevronDown } from "lucide-react";

const templates = [
  { id: "receipt", label: "영수증 추출" },
  { id: "invoice", label: "인보이스 추출" },
  { id: "contract", label: "계약서 추출" },
  { id: "report", label: "보고서 추출" },
  { id: "general", label: "일반 문서" },
];

const steps = [
  { icon: ScanText, label: "문서 스캔" },
  { icon: Table2, label: "텍스트, 표, 이미지 추출" },
  { icon: FileText, label: "LLM 정제" },
  { icon: Database, label: "DB 저장" },
];

const features = [
  { icon: Zap, label: "고성능 처리" },
  { icon: Shield, label: "암호화 보안" },
  { icon: Clock, label: "버전 관리" },
];

// Mock file data
const mockFileData = {
  id: "1",
  name: "Q4_Invoice_2023.pdf",
  version: "v2.1",
  size: "4.2 MB",
  uploader: "Sarah Chen",
};

function OcrTriggerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileId = searchParams.get("id") || "1";

  const [selectedTemplate, setSelectedTemplate] = useState("receipt");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const file = mockFileData;

  const handleStartOcr = () => {
    router.push(`/files/ocr/processing?id=${fileId}&template=${selectedTemplate}`);
  };

  const handleCancel = () => {
    router.push("/files");
  };

  const selectedTemplateLabel = templates.find((t) => t.id === selectedTemplate)?.label || "템플릿 선택";

  return (
    <main className="max-w-4xl mx-auto px-10 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">OCR 텍스트 추출</h1>
        <p className="text-sm text-gray-500">
          문서의 자동 텍스트 추출 파이프라인을 설정하고 시작합니다.
        </p>
      </div>

      {/* File Info Card */}
      <div className="bg-white border border-[#f3f4f6] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#137fec]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{file.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{file.version}</Badge>
                <span className="text-sm text-gray-500">· {file.size}</span>
                <span className="text-sm text-gray-500">·</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                  <span className="text-sm text-gray-700">{file.uploader}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Template Selector */}
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1 text-right">추출 템플릿</label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-3 min-w-[180px] px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {selectedTemplateLabel}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-full bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedTemplate === template.id ? "text-[#137fec] bg-blue-50" : "text-gray-700"
                    }`}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OCR Ready Card */}
      <div className="bg-white border border-[#f3f4f6] rounded-2xl p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="4" fill="#137fec" />
                <circle cx="16" cy="6" r="2" fill="#137fec" />
                <circle cx="16" cy="26" r="2" fill="#137fec" />
                <circle cx="6" cy="16" r="2" fill="#137fec" />
                <circle cx="26" cy="16" r="2" fill="#137fec" />
                <circle cx="8.93" cy="8.93" r="2" fill="#137fec" />
                <circle cx="23.07" cy="23.07" r="2" fill="#137fec" />
                <circle cx="8.93" cy="23.07" r="2" fill="#137fec" />
                <circle cx="23.07" cy="8.93" r="2" fill="#137fec" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">추출 준비 완료</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          고급 OCR 파이프라인을 실행하여 LLM 기반 엔진으로 텍스트, 복잡<br />
          한 표 및 시각적 요소를 자동으로 분석합니다.
        </p>

        {/* Start Button */}
        <Button onClick={handleStartOcr} size="lg" className="gap-2 px-8">
          <Zap className="w-4 h-4" />
          OCR 텍스트 추출 시작
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mt-12 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-400 mt-2 whitespace-nowrap">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-24 h-px bg-gray-200 mx-2 -mt-5" />
              )}
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex items-center justify-center gap-8 pt-6 border-t border-[#f3f4f6]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
              <feature.icon className="w-4 h-4" />
              {feature.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </main>
  );
}

export default function OcrTriggerPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Loading...</div>}>
        <OcrTriggerContent />
      </Suspense>
    </div>
  );
}
