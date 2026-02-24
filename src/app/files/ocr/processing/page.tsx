"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import { FileText, Check, Loader2, Circle, X, Eye } from "lucide-react";

const processingSteps = [
  { id: "preprocess", label: "문서 전처리", description: "최적화 및 형식 검증" },
  { id: "extract", label: "텍스트 및 표 추출", description: "고성능 OCR 엔진 실행" },
  { id: "llm", label: "LLM을 활용한 이미지 분석", description: "차트 및 시각 자료의 맥락 이해" },
  { id: "metadata", label: "메타데이터 합성", description: "최종 데이터 구조화 및 태깅" },
];

const mockLogs = [
  "[10:23:45] 문서 전처리 시작...",
  "[10:23:46] 이미지 품질 최적화 완료 (DPI: 300)",
  "[10:23:47] 문서 방향 자동 보정 완료",
  "[10:23:48] LLM 분석 요청 전송중...",
];

// Mock file data
const mockFileData = {
  id: "1",
  name: "Q4_Invoice_2023.pdf",
  version: "v3.4 (수정본)",
  uploader: "Alex Chen",
  uploadDate: "2023년 10월 10일 • 오전 11:45",
};

function OcrProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileId = searchParams.get("id") || "1";
  const template = searchParams.get("template") || "receipt";

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [remainingTime, setRemainingTime] = useState(105); // ~1분 45초

  const file = mockFileData;

  // Simulate progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Navigate to result page when done
          setTimeout(() => {
            router.push(`/files/ocr/result?id=${fileId}`);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [fileId, router]);

  // Update step based on progress
  useEffect(() => {
    if (progress < 25) setCurrentStep(0);
    else if (progress < 50) setCurrentStep(1);
    else if (progress < 75) setCurrentStep(2);
    else setCurrentStep(3);
  }, [progress]);

  // Add logs over time
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogs((prev) => {
        if (prev.length >= mockLogs.length) return prev;
        return [...prev, mockLogs[prev.length]];
      });
    }, 1500);

    return () => clearInterval(logInterval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const handleCancel = () => {
    router.push("/files");
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "processing";
    return "pending";
  };

  const getStepTime = (stepIndex: number) => {
    if (stepIndex < currentStep) return "완료";
    if (stepIndex === currentStep) return "진행중";
    return "대기중";
  };

  return (
    <main className="max-w-5xl mx-auto px-10 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">OCR 텍스트 추출 진행 중</h1>
        <p className="text-sm text-gray-500">
          문서에 대한 고급 AI 분석을 실행하고 있습니다
        </p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Progress Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-8 mb-6">
            {/* Current Step Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">현재 단계</p>
                <h3 className="font-semibold text-gray-900">
                  {processingSteps[currentStep]?.label}
                </h3>
              </div>
              <span className="text-2xl font-bold text-[#137fec]">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[#137fec] rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span>처리 중인 페이지: 총 3개 중 2개 완료</span>
            </div>

            {/* Divider */}
            <div className="border-t border-[#f3f4f6] my-6" />

            {/* Steps List */}
            <div className="space-y-4">
              {processingSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        status === "completed"
                          ? "bg-green-100"
                          : status === "processing"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : status === "processing" ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#137fec] animate-spin" />
                      ) : (
                        <Circle className="w-2 h-2 text-gray-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          status === "completed"
                            ? "text-green-700"
                            : status === "processing"
                            ? "text-[#137fec]"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>

                    {/* Status */}
                    <span
                      className={`text-xs ${
                        status === "completed"
                          ? "text-green-600"
                          : status === "processing"
                          ? "text-[#137fec]"
                          : "text-gray-400"
                      }`}
                    >
                      {getStepTime(index)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" className="gap-2" onClick={handleCancel}>
                <X className="w-4 h-4" />
                추출 중단하기
              </Button>
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                미리보기
              </Button>
            </div>
          </div>

          {/* Logs Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">실행 로그</h3>
              <span className="text-xs text-gray-400">마지막 업데이트: 방금 전</span>
            </div>
            <div className="font-mono text-xs text-gray-600 space-y-2 bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-400">로그를 불러오는 중...</p>
              ) : (
                logs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))
              )}
              <span className="inline-block w-2 h-4 bg-[#137fec] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80">
          {/* File Info Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-6 mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">대상 파일</h4>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#137fec]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500 truncate">{file.version}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500">버전</p>
                <p className="text-sm font-medium text-gray-900">{file.version}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">업로더</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                  <span className="text-sm text-gray-700">{file.uploader}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">생성 일자</p>
                <p className="text-sm text-gray-700">{file.uploadDate}</p>
              </div>
            </div>
          </div>

          {/* Estimated Time Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Loader2 className="w-5 h-5 text-[#137fec] animate-spin" />
              <p className="text-sm text-gray-600">
                고급 AI 파이프라인이 문서를 분석하고 있습니다. 잠시만 기다려 주세요.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">예상 남은 시간</p>
              <p className="text-lg font-semibold text-[#137fec]">
                ~ {formatTime(remainingTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OcrProcessingPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Loading...</div>}>
        <OcrProcessingContent />
      </Suspense>
    </div>
  );
}
