"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import { FileTable, FileFilters, Pagination, type FileItem } from "@/components/files";
import { RefreshCw, Upload } from "lucide-react";

// Mock data
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Q4_Invoice_2023.pdf",
    version: "v2.1",
    size: "4.2 MB",
    uploader: { name: "Sarah Chen" },
    uploadDate: "2023. 10. 12",
    lastWorkDate: "2023. 10. 12",
    status: "pending",
  },
  {
    id: "2",
    name: "contract_draft_final.pdf",
    version: "v1.0",
    size: "1.8 MB",
    uploader: { name: "Mike Ross" },
    uploadDate: "2023. 10. 11",
    lastWorkDate: "2023. 10. 11",
    status: "completed",
  },
  {
    id: "3",
    name: "product_catalog_2024.pdf",
    version: "v3.4",
    size: "12.5 MB",
    uploader: { name: "Alex Chen" },
    uploadDate: "2023. 10. 10",
    lastWorkDate: "2023. 10. 10",
    status: "pending",
  },
  {
    id: "4",
    name: "expense_report_sept.pdf",
    version: "v1.1",
    size: "0.9 MB",
    uploader: { name: "Sarah Chen" },
    uploadDate: "2023. 10. 09",
    lastWorkDate: "2023. 10. 09",
    status: "processing",
  },
  {
    id: "5",
    name: "annual_report_2023.pdf",
    version: "v1.2",
    size: "8.4 MB",
    uploader: { name: "Alex Chen" },
    uploadDate: "2023. 10. 08",
    lastWorkDate: "2023. 10. 08",
    status: "pending",
  },
  {
    id: "6",
    name: "tax_filing_final.pdf",
    version: "v2.0",
    size: "2.1 MB",
    uploader: { name: "Sarah Chen" },
    uploadDate: "2023. 10. 07",
    lastWorkDate: "2023. 10. 07",
    status: "completed",
  },
  {
    id: "7",
    name: "employment_contract.pdf",
    version: "v1.0",
    size: "0.5 MB",
    uploader: { name: "Mike Ross" },
    uploadDate: "2023. 10. 06",
    lastWorkDate: "2023. 10. 06",
    status: "pending",
  },
  {
    id: "8",
    name: "quarterly_results_v2.pdf",
    version: "v2.0",
    size: "3.7 MB",
    uploader: { name: "Alex Chen" },
    uploadDate: "2023. 10. 05",
    lastWorkDate: "2023. 10. 05",
    status: "pending",
  },
  {
    id: "9",
    name: "vendor_agreement_signed.pdf",
    version: "v1.0",
    size: "1.2 MB",
    uploader: { name: "Sarah Chen" },
    uploadDate: "2023. 10. 04",
    lastWorkDate: "2023. 10. 04",
    status: "completed",
  },
  {
    id: "10",
    name: "marketing_plan_2024.pdf",
    version: "v1.5",
    size: "5.9 MB",
    uploader: { name: "Mike Ross" },
    uploadDate: "2023. 10. 03",
    lastWorkDate: "2023. 10. 03",
    status: "pending",
  },
];

export default function FilesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [files] = useState<FileItem[]>(mockFiles);
  const totalItems = 1248;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleOcrExtract = (id: string) => {
    router.push(`/files/ocr?id=${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit file:", id);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Header />

      <main className="px-10 py-10">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">파일 관리</h1>
            <p className="text-sm text-gray-500">
              문서 관리에서 OCR 텍스트 추출부터 메타정보 편집까지 한 번에 처리합니다.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="default" className="gap-2" onClick={() => router.push("/files/version")}>
              <RefreshCw className="w-4 h-4" />
              버전 업데이트
            </Button>
            <Button variant="default" className="gap-2" onClick={() => router.push("/files/upload")}>
              <Upload className="w-4 h-4" />
              새 업로드
            </Button>
          </div>
        </div>

        {/* File Management Card */}
        <div className="bg-white border border-[#f3f4f6] rounded-2xl shadow-sm">
          {/* Filters */}
          <FileFilters />

          {/* Table */}
          <FileTable
            files={files}
            onOcrExtract={handleOcrExtract}
            onEdit={handleEdit}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
