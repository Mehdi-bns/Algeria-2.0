import { Newspaper, ExternalLink } from "lucide-react"

export interface NewsArticle {
  id: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  category: "news" | "study" | "guide" | "research"
  date: string
  readTime: string
  link: string
  image: string
}

export const newsAndStudies: NewsArticle[] = [
  {
    id: "1",
    title: "Sustainable Irrigation Techniques for Water Conservation",
    titleAr: "تقنيات الري المستدامة للحفاظ على المياه",
    excerpt:
      "New research shows drip irrigation systems can reduce water usage by up to 60% while maintaining crop yields. Learn how to implement these cost-effective solutions on your farm.",
    excerptAr:
      "تظهر الأبحاث الجديدة أن أنظمة الري بالتنقيط يمكن أن تقلل استخدام المياه بنسبة تصل إلى 60٪ مع الحفاظ على إنتاجية المحاصيل. تعلم كيفية تطبيق هذه الحلول الفعالة من حيث التكلفة في مزرعتك.",
    category: "study",
    date: "2025-11-25",
    readTime: "8 min",
    link: "#",
    image: "💧",
  },
  {
    id: "2",
    title: "Organic Pest Control Methods Show Promising Results",
    titleAr: "طرق مكافحة الآفات العضوية تظهر نتائج واعدة",
    excerpt:
      "A comprehensive study reveals natural pest management strategies that reduce chemical dependency by 75% without compromising harvest quality.",
    excerptAr:
      "كشفت دراسة شاملة عن استراتيجيات إدارة الآفات الطبيعية التي تقلل الاعتماد على المواد الكيميائية بنسبة 75٪ دون المساس بجودة الحصاد.",
    category: "research",
    date: "2025-11-22",
    readTime: "12 min",
    link: "#",
    image: "🐛",
  },
  {
    id: "3",
    title: "Climate-Resilient Crop Varieties for 2026",
    titleAr: "أصناف المحاصيل المقاومة للمناخ لعام 2026",
    excerpt:
      "Agricultural experts identify top crop varieties that thrive in changing weather conditions. Essential reading for farmers planning next season.",
    excerptAr:
      "يحدد خبراء الزراعة أفضل أصناف المحاصيل التي تزدهر في ظروف الطقس المتغيرة. قراءة أساسية للمزارعين الذين يخططون للموسم القادم.",
    category: "news",
    date: "2025-11-20",
    readTime: "6 min",
    link: "#",
    image: "🌾",
  },
  {
    id: "4",
    title: "Soil Health: The Foundation of Productive Farming",
    titleAr: "صحة التربة: أساس الزراعة المنتجة",
    excerpt:
      "Comprehensive guide on testing soil composition, maintaining pH balance, and enriching nutrients naturally for optimal crop growth.",
    excerptAr:
      "دليل شامل حول اختبار تركيب التربة والحفاظ على توازن الأس الهيدروجيني وإثراء العناصر الغذائية بشكل طبيعي لنمو المحاصيل الأمثل.",
    category: "guide",
    date: "2025-11-18",
    readTime: "15 min",
    link: "#",
    image: "🌱",
  },
  {
    id: "5",
    title: "Smart Farming Technologies Boost Productivity by 40%",
    titleAr: "تقنيات الزراعة الذكية تعزز الإنتاجية بنسبة 40٪",
    excerpt:
      "Latest agricultural technology trends including AI-powered monitoring, automated systems, and data-driven decision making transform modern farming.",
    excerptAr:
      "أحدث اتجاهات التكنولوجيا الزراعية بما في ذلك المراقبة المدعومة بالذكاء الاصطناعي والأنظمة الآلية واتخاذ القرارات المستندة إلى البيانات تحول الزراعة الحديثة.",
    category: "news",
    date: "2025-11-15",
    readTime: "10 min",
    link: "#",
    image: "🤖",
  },
  {
    id: "6",
    title: "Crop Rotation Strategies for Maximum Yield",
    titleAr: "استراتيجيات تناوب المحاصيل لتحقيق أقصى إنتاجية",
    excerpt:
      "Scientific research demonstrates optimal rotation patterns that improve soil fertility, reduce disease, and increase overall farm productivity.",
    excerptAr:
      "تظهر الأبحاث العلمية أنماط الدوران المثلى التي تحسن خصوبة التربة وتقلل الأمراض وتزيد من إنتاجية المزرعة الإجمالية.",
    category: "study",
    date: "2025-11-12",
    readTime: "14 min",
    link: "#",
    image: "🔄",
  },
]

interface DashboardProps {
  language: "en" | "ar"
}

export function Dashboard({ language }: DashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "in-progress":
        return "bg-blue-100 text-blue-700"
      case "planned":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "planting":
        return "🌱"
      case "irrigation":
        return "💧"
      case "fertilizing":
        return "🌿"
      case "harvesting":
        return "🌾"
      case "inspection":
        return "🔍"
      default:
        return "📋"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "bg-blue-100 text-blue-700"
      case "study":
        return "bg-purple-100 text-purple-700"
      case "guide":
        return "bg-green-100 text-green-700"
      case "research":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const t = {
    en: {
      title: "Farm Overview",
      subtitle: "Stay updated with latest agricultural news, research, and farming guides",
      newsTitle: "Agricultural News & Studies",
      newsSubtitle: "Expert insights and research to help you make informed farming decisions",
      readMore: "Read More",
      news: "News",
      study: "Study",
      guide: "Guide",
      research: "Research",
      minRead: "read",
    },
    ar: {
      title: "نظرة عامة على المزرعة",
      subtitle: "ابق على اطلاع بأحدث الأخبار الزراعية والأبحاث والأدلة الزراعية",
      newsTitle: "الأخبار والدراسات الزراعية",
      newsSubtitle: "رؤى الخبراء والأبحاث لمساعدتك على اتخاذ قرارات زراعية مستنيرة",
      readMore: "اقرأ المزيد",
      news: "أخبار",
      study: "دراسة",
      guide: "دليل",
      research: "بحث",
      minRead: "قراءة",
    },
  }

  return (
    <div className="p-4 md:p-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">{t[language].title}</h1>
        <p className="text-gray-600">{t[language].subtitle}</p>
      </div>

      {/* News and Studies */}
      <div className="space-y-4">
        <div className="mb-6 flex items-center gap-3">
          <Newspaper className="text-green-600" size={28} />
          <div>
            <h2 className="text-gray-900 mb-1">{t[language].newsTitle}</h2>
            <p className="text-gray-600">{t[language].newsSubtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsAndStudies.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">{article.image}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(article.category)}`}>
                      {language === "ar"
                        ? article.category === "news"
                          ? t[language].news
                          : article.category === "study"
                            ? t[language].study
                            : article.category === "guide"
                              ? t[language].guide
                              : t[language].research
                        : article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {article.readTime} {t[language].minRead}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-snug">
                {language === "ar" ? article.titleAr : article.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {language === "ar" ? article.excerptAr : article.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-gray-500 text-xs">{article.date}</span>
                <a
                  href={article.link}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors group/link"
                >
                  <span className="text-sm font-medium">{t[language].readMore}</span>
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
