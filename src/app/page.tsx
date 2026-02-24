import { Header } from "@/components/layout";
import Image from "next/image";

const features = [
  {
    icon: "/icons/icon-upload.png",
    title: "PDF 업로드",
    description: "오브젝트 스토리지를 활용하여 보안이 강화된 클라우드 저장소에 파일을 안전하게 업로드합니다.",
  },
  {
    icon: "/icons/icon-ocr.png",
    title: "AI OCR 추출",
    description: "AI 에이전트가 복잡한 문서 내 텍스트, 테이블, 이미지를 정확하게 분류하여 정교하게 추출합니다.",
  },
  {
    icon: "/icons/icon-llm.png",
    title: "LLM 정제",
    description: "OCR 결과물을 거대언어모델(LLM)로 정규화 및 가공하여 신뢰도 높은 정제 데이터를 생성합니다.",
  },
  {
    icon: "/icons/icon-database.png",
    title: "메타데이터 저장",
    description: "페이지 정보 및 키워드 기반 색인을 생성하여 문서 검색 및 데이터 활용도를 극대화합니다.",
  },
];

const benefits = [
  {
    icon: "/icons/benefit-ai.png",
    title: "AI 에이전트 자동화",
    description: "지능형 자동 데이터 처리",
  },
  {
    icon: "/icons/benefit-vector.png",
    title: "벡터 데이터 전환",
    description: "RAG 시스템 임베딩 지원",
  },
  {
    icon: "/icons/benefit-chunking.png",
    title: "청킹 최적화",
    description: "LLM 기반 맥락 보존 분할",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] relative overflow-hidden">
      {/* Background blur overlays - from Figma */}
      <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] z-[1] pointer-events-none">
        <Image
          src="/icons/bg-blur-right.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] z-[1] pointer-events-none">
        <Image
          src="/icons/bg-blur-left.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Grid pattern overlay - from Figma */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <Image
          src="/icons/bg-pattern.png"
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      <Header />

      <main className="relative z-[10]">
        {/* Hero Section */}
        <section className="max-w-[1152px] mx-auto px-[128px] py-[100px] text-center">
          <div
            className="py-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(19,127,236,0.05) 0%, transparent 70%)",
            }}
          >
            <h1 className="text-[64px] font-bold mb-8 leading-[1.2]">
              <span className="text-[#111827]">대규모 지능형</span>
              <br />
              <span className="text-[#137fec]">데이터 추출</span>
            </h1>
            <p className="text-[18px] text-[#6b7280] max-w-[672px] mx-auto leading-[1.6]">
              비정형 PDF 문서를 최신 AI 기술을 통해 즉시 활용 가능한
              <br />
              정제된 데이터로 변환하여 업무의 가치를 높이세요.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-[960px] mx-auto px-8 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-[#f3f4f6] rounded-[24px] p-[49px] shadow-[inset_0px_4px_20px_0px_rgba(0,0,0,0.03)] hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] transition-shadow overflow-hidden"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-[80px] h-[80px] mb-8 relative">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#111827] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.6] max-w-[280px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-[960px] mx-auto px-8 pt-[51px] border-t border-[#f3f4f6] mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[48px]">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-5">
                <div className="w-[60px] h-[60px] relative flex-shrink-0">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#111827] text-[16px]">{benefit.title}</h4>
                  <p className="text-[14px] text-[#6b7280]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
