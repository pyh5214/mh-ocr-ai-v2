"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { FileUp, Search, X, FileText, Upload, Info } from "lucide-react";

interface SelectedFile {
  name: string;
  size: number;
}

type VersionType = "minor" | "major";

export default function VersionUpdatePage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [currentVersion] = useState("1.0");
  const [versionType, setVersionType] = useState<VersionType>("minor");
  const [fileDescription, setFileDescription] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      handleFileSelect({ name: files[0].name, size: files[0].size });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect({ name: files[0].name, size: files[0].size });
    }
  };

  const handleFileSelect = (file: SelectedFile) => {
    setSelectedFile(file);
    setFileName(file.name.replace(".pdf", "_Update_Draft.pdf"));
    setFileSize((file.size / (1024 * 1024)).toFixed(1));
    // Simulate finding original file
    setOriginalFileName(file.name);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setFileName("");
    setFileSize("");
    setOriginalFileName("");
  };

  const getNewVersion = () => {
    const [major, minor] = currentVersion.split(".").map(Number);
    return versionType === "minor" ? `${major}.${minor + 1}` : `${major + 1}.0`;
  };

  const handleCancel = () => router.push("/files");

  const handleUpload = () => {
    console.log("Version update:", { fileName, versionType, newVersion: getNewVersion() });
    router.push("/files");
  };

  const isFormValid = selectedFile && fileName.trim() && originalFileName.trim();

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />

      <main className="max-w-4xl mx-auto px-10 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">버전업 파일 업로드 및 정보 입력</h1>
          <p className="text-sm text-gray-500">
            {selectedFile
              ? "파일 업로드 준비가 완료되었습니다. 상세 정보를 확인 후 업로드 해주세요."
              : "업로드할 파일을 선택하고 상세 정보를 입력해 주세요."}
          </p>
        </div>

        {/* Dropzone */}
        {selectedFile ? (
          <div className="relative border-2 border-dashed border-[#137fec] rounded-2xl p-12 bg-blue-50/30">
            <button
              onClick={handleRemove}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#137fec]" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-1">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB · <span className="text-[#137fec]">선택 완료</span>
              </p>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 transition-colors ${
              isDragging ? "border-[#137fec] bg-blue-50" : "border-[#e5e7eb] bg-white hover:border-[#137fec]/50"
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileUp className="w-6 h-6 text-[#137fec]" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">새 문서 드래그 앤 드롭</p>
              <p className="text-sm text-gray-500 text-center mb-1">
                파일을 드래그앤드롭으로 첨부하면 파일명으로 기존 문서를 자동 검
              </p>
              <p className="text-sm text-gray-500 text-center mb-1">
                색해 업데이트 대상을 즉시 매칭 · 대체합니다.
              </p>
              <p className="text-sm text-gray-500 text-center mb-6">
                일치하는 파일이 없으면 사용자가 직접 검색해 대상 파일을 선택해<br />
                업데이트할 수 있습니다.
              </p>
              <label className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg shadow hover:bg-[#1171d6] cursor-pointer transition-colors">
                <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" />
                <Search className="w-4 h-4" />
                파일 찾기
              </label>
              <p className="text-xs text-gray-400 mt-8">50 MB 이하 PDF 문서만 지원합니다.</p>
            </div>
          </div>
        )}

        {/* File Details Form */}
        <div className="mt-6 bg-white border border-[#f3f4f6] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-[#137fec]" />
            <h2 className="font-semibold text-gray-900">파일 상세 정보</h2>
          </div>

          <div className="space-y-6">
            {/* Original File Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">원본 파일명</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={originalFileName}
                  onChange={(e) => setOriginalFileName(e.target.value)}
                  placeholder="기존 파일을 검색하여 버전을 관리할 수 있습니다."
                  className="pl-10"
                />
              </div>
            </div>

            {/* File Name & Size Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일명</label>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="—"
                  disabled={!selectedFile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 사이즈</label>
                <div className="relative">
                  <Input value={fileSize} readOnly className="pr-12 bg-gray-50" placeholder="—" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">MB</span>
                </div>
              </div>
            </div>

            {/* Version Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">파일 버전 관리</label>
              <div className="flex items-center border border-[#e5e7eb] rounded-lg p-3 bg-gray-50">
                <div className="px-4 py-2 border-r border-[#e5e7eb]">
                  <span className="text-xs text-gray-500 block">기존 버전</span>
                  <span className="font-semibold text-gray-900">{currentVersion}</span>
                </div>
                <div className="flex items-center gap-6 px-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="versionType"
                      checked={versionType === "minor"}
                      onChange={() => setVersionType("minor")}
                      className="w-4 h-4 text-[#137fec]"
                    />
                    <span className="text-sm text-gray-700">마이너 버전업 (+0.1)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="versionType"
                      checked={versionType === "major"}
                      onChange={() => setVersionType("major")}
                      className="w-4 h-4 text-[#137fec]"
                    />
                    <span className="text-sm text-gray-700">메이저 버전업 (+1.0)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">파일 설명</label>
              <textarea
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                placeholder="파일에 대한 간단한 설명을 입력해 주세요."
                rows={4}
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#137fec] resize-none"
                disabled={!selectedFile}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            {isFormValid ? (
              <span className="text-[#137fec]">모든 정보가 입력되었습니다.</span>
            ) : (
              "모든 필수 항목을 확인 후 업로드를 시작하세요."
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleCancel}>취소</Button>
            <Button onClick={handleUpload} disabled={!isFormValid} className="gap-2">
              <Upload className="w-4 h-4" />
              업로드 시작
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
