import { Header } from "@/components/layout";
import {
  CloudUpload,
  ScanText,
  Sparkles,
  Database,
  CheckCircle,
  Zap,
  Settings2
} from "lucide-react";

const features = [
  {
    icon: CloudUpload,
    title: "PDF 업로드",
    description: "오브젝트 스토리지를 활용하여 보안이 강화된 클라우드 저장소에 파일을 안전하게 업로드합니다.",
    color: "bg-[#137fec]",
  },
  {
    icon: ScanText,
    title: "AI OCR 추출",
    description: "AI 에이전트가 복잡한 문서 내 텍스트, 테이블, 이미지를 정확하게 분류하여 정교하게 추출합니다.",
    color: "bg-[#137fec]",
  },
  {
    icon: Sparkles,
    title: "LLM 정제",
    description: "OCR 결과물을 거대언어모델(LLM)로 정규화 및 가공하여 신뢰도 높은 정제 데이터를 생성합니다.",
    color: "bg-[#137fec]",
  },
  {
    icon: Database,
    title: "메타데이터 저장",
    description: "페이지 정보 및 키워드 기반 색인을 생성하여 문서 검색 및 데이터 활용도를 극대화합니다.",
    color: "bg-[#137fec]",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "AI 에이전트 자동화",
    description: "지능형 자동 데이터 처리",
    color: "text-[#137fec]",
    bgColor: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "벡터 데이터 전환",
    description: "RAG 시스템 임베딩 지원",
    color: "text-[#137fec]",
    bgColor: "bg-blue-50",
  },
  {
    icon: Settings2,
    title: "청킹 최적화",
    description: "LLM 기반 맥락 보존 분할",
    color: "text-[#137fec]",
    bgColor: "bg-blue-50",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-blue-100/50 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-blue-50/30 to-transparent rounded-full blur-3xl -translate-x-1/4" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 py-24 text-center">
          <div
            className="py-16 px-8"
            style={{
              background: "radial-gradient(ellipse at center, rgba(19,127,236,0.05) 0%, transparent 70%)",
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gray-900">대규모 지능형</span>
              <br />
              <span className="text-[#137fec]">데이터 추출</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              비정형 PDF 문서를 최신 AI 기술을 통해 즉시 활용 가능한
              <br />
              정제된 데이터로 변환하여 업무의 가치를 높이세요.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-5xl mx-auto px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-[#f3f4f6] rounded-3xl p-12 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] hover:shadow-[0px_8px_30px_0px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-5xl mx-auto px-8 py-12 border-t border-[#f3f4f6]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-5">
                <div className={`w-14 h-14 ${benefit.bgColor} rounded-full flex items-center justify-center`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
