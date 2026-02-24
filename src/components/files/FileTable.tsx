"use client";

import { Badge } from "@/components/ui";
import { FileText, Pencil, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export interface FileItem {
  id: string;
  name: string;
  version: string;
  size: string;
  uploader: {
    name: string;
    avatar?: string;
  };
  uploadDate: string;
  lastWorkDate: string;
  status: "pending" | "processing" | "completed";
}

interface FileTableProps {
  files: FileItem[];
  onOcrExtract?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function FileTable({ files, onOcrExtract, onEdit }: FileTableProps) {
  const getStatusButton = (file: FileItem) => {
    switch (file.status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            완료됨
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 text-yellow-600 text-xs font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            작업중
          </span>
        );
      default:
        return (
          <button
            onClick={() => onOcrExtract?.(file.id)}
            className="px-3 py-1.5 bg-[#137fec] text-white text-xs font-medium rounded-md hover:bg-[#1171d6] transition-colors"
          >
            OCR 추출
          </button>
        );
    }
  };

  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#f3f4f6]">
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">파일명</th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">버전</th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">크기</th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">업로더</th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">업로드 날짜</th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500">최종 작업 날짜</th>
            <th className="text-center py-4 px-6 text-xs font-medium text-gray-500">작업</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-b border-[#f3f4f6] hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <Badge variant="outline" className="text-xs">
                  {file.version}
                </Badge>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{file.size}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  {file.uploader.avatar ? (
                    <Image
                      src={file.uploader.avatar}
                      alt={file.uploader.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">{file.uploader.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{file.uploadDate}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{file.lastWorkDate}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-2">
                  {getStatusButton(file)}
                  {file.status === "pending" && (
                    <button
                      onClick={() => onEdit?.(file.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
