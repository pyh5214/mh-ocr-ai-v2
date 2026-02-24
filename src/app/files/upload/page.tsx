"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { FileDropzone } from "@/components/files/FileDropzone";
import { FileText, Upload, Info } from "lucide-react";

interface SelectedFile {
  name: string;
  size: number;
}

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileVersion] = useState("V1.0");
  const [fileDescription, setFileDescription] = useState("");

  const handleFileSelect = (file: SelectedFile | null) => {
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1));
    } else {
      setFileName("");
      setFileSize("");
    }
  };

  const handleCancel = () => {
    router.push("/files");
  };

  const handleUpload = () => {
    // In real app, would upload file here
    console.log("Uploading:", { fileName, fileSize, fileVersion, fileDescription });
    router.push("/files");
  };

  const isFormValid = selectedFile && fileName.trim();

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />

      <main className="max-w-4xl mx-auto px-10 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">파일 업로드 및 정보 입력</h1>
          <p className="text-sm text-gray-500">
            {selectedFile
              ? "선택된 파일을 확인하고 상세 정보를 입력해 주세요."
              : "업로드할 파일을 선택하고 상세 정보를 입력해 주세요."}
          </p>
        </div>

        {/* File Dropzone */}
        <FileDropzone selectedFile={selectedFile} onFileSelect={handleFileSelect} />

        {/* File Details Form */}
        <div className="mt-6 bg-white border border-[#f3f4f6] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-[#137fec]" />
            <h2 className="font-semibold text-gray-900">파일 상세 정보</h2>
          </div>

          <div className="space-y-6">
            {/* File Name & Size Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  파일명
                </label>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="파일명을 입력하세요"
                  disabled={!selectedFile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  파일 사이즈
                </label>
                <div className="relative">
                  <Input
                    value={fileSize}
                    readOnly
                    className="pr-12 bg-gray-50"
                    placeholder="—"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    MB
                  </span>
                </div>
              </div>
            </div>

            {/* File Version */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파일 버전
              </label>
              <Input
                value={fileVersion}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* File Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파일 설명
              </label>
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
            {selectedFile
              ? "내용을 확인하신 후 '업로드 시작' 버튼을 클릭하세요."
              : "모든 필수 항목을 확인 후 업로드를 시작하세요."}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleCancel}>
              취소
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!isFormValid}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              업로드 시작
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
