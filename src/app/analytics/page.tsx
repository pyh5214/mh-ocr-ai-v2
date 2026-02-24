"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Button, Badge } from "@/components/ui";
import {
  FileText,
  CheckCircle2,
  Clock,
  Download,
  TrendingUp,
  FileCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Stats data
const statsData = [
  {
    id: "total",
    label: "전체 업로드 파일",
    value: "1,284",
    icon: FileText,
    change: "+12.5%",
    changeType: "positive" as const,
    bgColor: "bg-blue-50",
    iconColor: "text-[#137fec]",
  },
  {
    id: "completed",
    label: "OCR 완료",
    value: "1,240",
    icon: CheckCircle2,
    change: "+8.2%",
    changeType: "positive" as const,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "pending",
    label: "대기 중인 작업",
    value: "44",
    icon: Clock,
    change: "-3.1%",
    changeType: "negative" as const,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

// Monthly chart data
const chartData = [
  { month: "1월", value: 180, height: 180 },
  { month: "2월", value: 200, height: 200 },
  { month: "3월", value: 160, height: 160 },
  { month: "4월", value: 190, height: 190 },
  { month: "5월", value: 220, height: 220 },
  { month: "6월", value: 140, height: 140 },
];

// Recent activity
const recentActivity = [
  {
    id: "1",
    icon: FileCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    fileName: "Q4_Invoice_2023.pdf",
    status: "12개 필드 추출 성공",
    time: "2분 전",
  },
  {
    id: "2",
    icon: Loader2,
    iconBg: "bg-blue-100",
    iconColor: "text-[#137fec]",
    fileName: "contract_draft_final.pdf",
    status: "OCR 처리 중",
    time: "5분 전",
  },
  {
    id: "3",
    icon: FileCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    fileName: "report_2024.pdf",
    status: "5개 필드 추출 성공",
    time: "14분 전",
  },
  {
    id: "4",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    fileName: "corrupted_document.docx",
    status: "추출 실패: 지원하지 않는 파일 형식",
    time: "1시간 전",
  },
  {
    id: "5",
    icon: FileCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    fileName: "annual_report_2023.pdf",
    status: "82개 필드 추출 성공",
    time: "2시간 전",
  },
];

// User stats
const userStats = [
  { name: "Alex Johnson", uploads: 156, extractions: 142 },
  { name: "Sarah Chen", uploads: 134, extractions: 128 },
  { name: "Mike Ross", uploads: 98, extractions: 91 },
  { name: "Emily Park", uploads: 87, extractions: 82 },
];

export default function AnalyticsPage() {
  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />

      <main className="px-10 py-8">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">통계 대시보드</h1>
            <p className="text-sm text-gray-500">
              문서 업로드 처리 현황과 OCR 추출 결과에 대한 통계 개요입니다.
            </p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            리포트 다운로드
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white border border-[#f3f4f6] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <Badge
                  variant={stat.changeType === "positive" ? "success" : "destructive"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="col-span-8 bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">월별 처리 현황</h2>
                <p className="text-sm text-gray-500">최근 6개월 OCR 처리 통계</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">1,090</p>
                <p className="text-sm text-gray-500">총 처리 건수</p>
              </div>
            </div>

            {/* Chart */}
            <div className="flex items-end justify-between h-64 gap-4">
              {chartData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-12 bg-[#137fec] rounded-t-lg transition-all duration-300 hover:bg-[#1171d6]"
                    style={{ height: `${(data.value / maxChartValue) * 200}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-3">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-4 bg-white border border-[#f3f4f6] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
              <a href="#" className="text-sm text-[#137fec] hover:underline">
                전체 보기
              </a>
            </div>

            <div className="space-y-5">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.status} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">사용자별 통계</h2>

          <div className="grid grid-cols-4 gap-6">
            {userStats.map((user) => (
              <div
                key={user.name}
                className="border border-[#f3f4f6] rounded-xl p-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">업로드 파일</span>
                    <span className="font-medium text-gray-900">{user.uploads}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">추출 완료</span>
                    <span className="font-medium text-gray-900">{user.extractions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
