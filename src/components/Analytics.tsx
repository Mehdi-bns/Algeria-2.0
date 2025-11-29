import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsProps {
  language: "en" | "ar"
}

export function Analytics({ language }: AnalyticsProps) {
  const yieldData = [
    { month: language === "ar" ? "يناير" : "Jan", yield: 2400 },
    { month: language === "ar" ? "فبراير" : "Feb", yield: 2800 },
    { month: language === "ar" ? "مارس" : "Mar", yield: 3200 },
    { month: language === "ar" ? "أبريل" : "Apr", yield: 3600 },
    { month: language === "ar" ? "مايو" : "May", yield: 4200 },
    { month: language === "ar" ? "يونيو" : "Jun", yield: 4800 },
  ]

  const cropDistribution = [
    { name: language === "ar" ? "طماطم" : "Tomatoes", value: 30 },
    { name: language === "ar" ? "قمح" : "Wheat", value: 35 },
    { name: language === "ar" ? "ذرة" : "Corn", value: 20 },
    { name: language === "ar" ? "جزر" : "Carrots", value: 15 },
  ]

  const waterUsage = [
    { week: language === "ar" ? "الأسبوع 1" : "Week 1", usage: 1200 },
    { week: language === "ar" ? "الأسبوع 2" : "Week 2", usage: 1400 },
    { week: language === "ar" ? "الأسبوع 3" : "Week 3", usage: 1100 },
    { week: language === "ar" ? "الأسبوع 4" : "Week 4", usage: 1600 },
  ]

  const COLORS = ["#16a34a", "#3b82f6", "#f59e0b", "#ef4444"]

  const t = {
    en: {
      title: "Farm Analytics",
      subtitle: "Insights and data visualization for better decision making",
      totalYield: "Total Yield (kg)",
      waterUsage: "Water Usage (L)",
      activeCrops: "Active Crops",
      farmArea: "Farm Area (hectares)",
      yieldTrends: "Yield Trends",
      cropDist: "Crop Distribution",
      waterMonthly: "Water Usage (Monthly)",
      fromLast: "from last month",
      varieties: "varieties",
      utilized: "utilized",
    },
    ar: {
      title: "تحليلات المزرعة",
      subtitle: "رؤى وتصور البيانات لاتخاذ قرارات أفضل",
      totalYield: "إجمالي الإنتاج (كجم)",
      waterUsage: "استخدام المياه (لتر)",
      activeCrops: "المحاصيل النشطة",
      farmArea: "مساحة المزرعة (هكتار)",
      yieldTrends: "اتجاهات الإنتاج",
      cropDist: "توزيع المحاصيل",
      waterMonthly: "استخدام المياه (شهري)",
      fromLast: "من الشهر الماضي",
      varieties: "أصناف",
      utilized: "مستخدم",
    },
  }

  return (
    <div className="p-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">{t[language].title}</h1>
        <p className="text-gray-600">{t[language].subtitle}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">{t[language].totalYield}</p>
          <p className="text-green-600">21,000</p>
          <p className="text-green-600 text-sm">+12% {t[language].fromLast}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">{t[language].waterUsage}</p>
          <p className="text-blue-600">5,300</p>
          <p className="text-blue-600 text-sm">-8% {t[language].fromLast}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">{t[language].activeCrops}</p>
          <p className="text-yellow-600">12</p>
          <p className="text-yellow-600 text-sm">4 {t[language].varieties}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">{t[language].farmArea}</p>
          <p className="text-purple-600">25.5</p>
          <p className="text-purple-600 text-sm">92% {t[language].utilized}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">{t[language].yieldTrends}</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name={language === "ar" ? "الإنتاج" : "Yield"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">{t[language].cropDist}</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">{t[language].waterMonthly}</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="#3b82f6" name={language === "ar" ? "الاستخدام" : "Usage"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
