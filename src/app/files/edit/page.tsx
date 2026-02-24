"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Input, ConfirmModal } from "@/components/ui";
import { Trash2, ScanText, Save, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface FileData {
  id: string;
  name: string;
  version: string;
  size: string;
  uploader: string;
  uploadDate: string;
}

const mockFileData: FileData = {
  id: "1",
  name: "invoice_q4_marketing.pdf",
  version: "v2.4.0",
  size: "12.8 MB",
  uploader: "Alex Johnson",
  uploadDate: "2023년 10월 24일",
};

function EditFileMetadataContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileId = searchParams.get("id") || "1";

  const [fileName, setFileName] = useState(mockFileData.name);
  const [fileVersion, setFileVersion] = useState(mockFileData.version);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const file = mockFileData;

  const handleSave = () => {
    console.log("Saving:", { fileName, fileVersion });
    router.push("/files");
  };

  const handleCancel = () => {
    router.push("/files");
  };

  const handleDelete = () => {
    console.log("Deleting file:", fileId);
    setShowDeleteModal(false);
    router.push("/files");
  };

  const handleOcrExtract = () => {
    router.push(`/files/ocr?id=${fileId}`);
  };

  return (
    <>
      <main className="max-w-5xl mx-auto px-10 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">파일 정보</h1>
          <p className="text-sm text-gray-500">
            업로드한 사용자 본인만 문서 정보를 수정할 수 있으며, OCR 텍스트 추출을 수행한 문서는 정보 수정이 불가능합니다.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-[#f0f2f4] rounded-xl shadow-sm overflow-hidden">
          <div className="flex">
            {/* Left - Document Preview */}
            <div className="w-[420px] bg-[#f8f9fb] border-r border-[#f0f2f4] p-8">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                VISIBILITY DOCUMENT PREVIEW
              </h3>

              {/* Preview Area */}
              <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[3/4] relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* Simulated Document Preview */}
                  <div className="w-3/4 h-4/5 bg-white shadow-lg rounded relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col p-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
                      <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-gray-100 rounded mb-4" />
                      <div className="flex-1 bg-amber-100/50 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button className="w-10 h-10 rounded-full border border-[#137fec] flex items-center justify-center text-[#137fec] hover:bg-blue-50 transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-[#137fec] flex items-center justify-center text-[#137fec] hover:bg-blue-50 transition-colors">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 border border-[#137fec] flex items-center justify-center text-[#137fec] hover:bg-blue-50 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 p-8">
              <div className="space-y-6">
                {/* File Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">파일명</label>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="파일명을 입력하세요"
                  />
                </div>

                {/* Version */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">버전</label>
                  <Input
                    value={fileVersion}
                    onChange={(e) => setFileVersion(e.target.value)}
                    placeholder="버전을 입력하세요"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-[#f0f2f4]" />

                {/* File Info Section */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                    읽기 전용 정보
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">크기</p>
                      <p className="text-sm font-medium text-gray-900">{file.size}</p>
                    </div>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">업로더</p>
                      <p className="text-sm font-medium text-gray-900">{file.uploader}</p>
                    </div>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">날짜</p>
                      <p className="text-sm font-medium text-gray-900">{file.uploadDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-[#f0f2f4] px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4" />
                파일 삭제
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleOcrExtract}>
                <ScanText className="w-4 h-4" />
                OCR 텍스트 추출
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleCancel}>
                취소
              </Button>
              <Button className="gap-2" onClick={handleSave}>
                <Save className="w-4 h-4" />
                변경 사항 저장
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="파일 삭제"
        description="이 파일을 삭제하시겠습니까? 삭제된 파일은 복구할 수 없습니다."
        variant="destructive"
      />
    </>
  );
}

export default function EditFileMetadataPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Loading...</div>}>
        <EditFileMetadataContent />
      </Suspense>
    </div>
  );
}
