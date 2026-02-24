"use client";

import { useState, useCallback } from "react";
import { FileUp, Search, X, FileText } from "lucide-react";

interface SelectedFile {
  name: string;
  size: number;
}

interface FileDropzoneProps {
  selectedFile: SelectedFile | null;
  onFileSelect: (file: SelectedFile | null) => void;
}

export function FileDropzone({ selectedFile, onFileSelect }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        onFileSelect({ name: file.name, size: file.size });
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onFileSelect({ name: file.name, size: file.size });
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const handleRemove = () => {
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
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
            {formatFileSize(selectedFile.size)} · <span className="text-[#137fec]">선택 완료</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-12 transition-colors ${
        isDragging
          ? "border-[#137fec] bg-blue-50"
          : "border-[#e5e7eb] bg-white hover:border-[#137fec]/50"
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
        <p className="text-sm text-gray-500 mb-6">여기에 파일을 끌어다 놓거나 버튼을 클릭하여 선택하세요.</p>

        <label className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg shadow hover:bg-[#1171d6] cursor-pointer transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <Search className="w-4 h-4" />
          파일 찾기
        </label>

        <p className="text-xs text-gray-400 mt-8">50 MB 이하 PDF 문서만 지원합니다.</p>
      </div>
    </div>
  );
}
