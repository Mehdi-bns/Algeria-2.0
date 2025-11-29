"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Camera, Upload, AlertCircle, Bell, X, Filter } from "lucide-react"

export interface FarmingRoutine {
  id: string
  name: string
  description: string
  tasks: string[]
  frequency: string
  successRate: number
  difficulty: "beginner" | "intermediate" | "advanced"
  icon: string
}

export const farmingRoutines: FarmingRoutine[] = [
  {
    id: "1",
    name: "Standard Growth Routine",
    description: "Balanced approach for consistent crop development with regular monitoring and maintenance.",
    tasks: ["Daily watering", "Weekly fertilizing", "Bi-weekly pest inspection", "Monthly soil testing"],
    frequency: "Daily tasks with weekly checkups",
    successRate: 92,
    difficulty: "beginner",
    icon: "🌱",
  },
  {
    id: "2",
    name: "Organic Intensive Care",
    description: "Chemical-free cultivation with enhanced natural methods for premium organic produce.",
    tasks: ["Twice-daily inspection", "Organic composting", "Natural pest control", "pH monitoring"],
    frequency: "Multiple daily tasks",
    successRate: 88,
    difficulty: "intermediate",
    icon: "🌿",
  },
  {
    id: "3",
    name: "High-Yield Commercial",
    description: "Optimized routine for maximum productivity and commercial-scale operations.",
    tasks: ["Automated irrigation", "Precision fertilization", "Growth tracking", "Yield optimization"],
    frequency: "Automated with weekly reviews",
    successRate: 95,
    difficulty: "advanced",
    icon: "📈",
  },
  {
    id: "4",
    name: "Water-Efficient Routine",
    description: "Conservation-focused approach minimizing water usage while maintaining crop health.",
    tasks: ["Drip irrigation", "Moisture monitoring", "Mulching", "Strategic watering times"],
    frequency: "2-3 times per week",
    successRate: 90,
    difficulty: "intermediate",
    icon: "💧",
  },
  {
    id: "5",
    name: "Research & Development",
    description: "Experimental routine for testing new varieties and innovative growing techniques.",
    tasks: ["Data collection", "Variable testing", "Comparative analysis", "Documentation"],
    frequency: "Continuous monitoring",
    successRate: 78,
    difficulty: "advanced",
    icon: "🔬",
  },
]

interface Crop {
  id: string
  name: string
  variety: string
  plantedDate: string
  expectedHarvest: string
  area: string
  health: "excellent" | "good" | "warning" | "critical"
  soilMoisture: number
  temperature: number
  growth: number
  routine: string
  routineId: string
}

const crops: Crop[] = [
  {
    id: "1",
    name: "Tomatoes",
    variety: "Cherry Tomato",
    plantedDate: "2025-10-15",
    expectedHarvest: "2025-12-20",
    area: "Greenhouse 2",
    health: "excellent",
    soilMoisture: 75,
    temperature: 24,
    growth: 65,
    routine: "Organic Intensive Care",
    routineId: "2",
  },
  {
    id: "2",
    name: "Wheat",
    variety: "Winter Wheat",
    plantedDate: "2025-09-01",
    expectedHarvest: "2026-06-15",
    area: "North Field",
    health: "good",
    soilMoisture: 60,
    temperature: 18,
    growth: 45,
    routine: "High-Yield Commercial",
    routineId: "3",
  },
  {
    id: "3",
    name: "Corn",
    variety: "Sweet Corn",
    plantedDate: "2025-10-20",
    expectedHarvest: "2026-01-25",
    area: "East Field",
    health: "warning",
    soilMoisture: 45,
    temperature: 22,
    growth: 50,
    routine: "Water-Efficient Routine",
    routineId: "4",
  },
  {
    id: "4",
    name: "Carrots",
    variety: "Nantes Carrot",
    plantedDate: "2025-10-01",
    expectedHarvest: "2025-12-15",
    area: "South Field",
    health: "good",
    soilMoisture: 70,
    temperature: 20,
    growth: 70,
    routine: "Standard Growth Routine",
    routineId: "1",
  },
]

const notifications = [
  {
    id: "1",
    message: "Tomatoes need watering in 2 hours",
    time: "10 minutes ago",
  },
  {
    id: "2",
    message: "Wheat harvest ready in 3 weeks",
    time: "1 hour ago",
  },
  {
    id: "3",
    message: "Pest alert: Check corn field",
    time: "2 hours ago",
  },
]

export interface CropManagementProps {
  searchQuery: string
  language: "en" | "ar"
}

export function CropManagement({ searchQuery, language }: CropManagementProps) {
  const currentLanguage = language || ("en" as const)

  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [manageCrop, setManageCrop] = useState<Crop | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [taskStatus, setTaskStatus] = useState<Record<string, Record<string, boolean>>>({})
  const [showCreateCrop, setShowCreateCrop] = useState(false)
  const [showRoutineSelection, setShowRoutineSelection] = useState(false)
  const [showCustomRoutine, setShowCustomRoutine] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [cropToDelete, setCropToDelete] = useState<Crop | null>(null)
  const [deletedCropIds, setDeletedCropIds] = useState<string[]>([])
  const [newCropData, setNewCropData] = useState({
    name: "",
    variety: "",
    area: "",
    plantedDate: "",
    routineId: "",
  })
  const [customRoutine, setCustomRoutine] = useState({
    name: "",
    tasks: [""],
    frequency: "",
  })
  const [filterHealth, setFilterHealth] = useState<string>("all")

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600 bg-green-50"
      case "good":
        return "text-blue-600 bg-blue-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysisResult({
            health: Math.random() > 0.5 ? "healthy" : "disease",
            confidence: Math.floor(Math.random() * 20) + 80,
            issues: Math.random() > 0.5 ? [] : ["Leaf spot detected", "Nutrient deficiency"],
            recommendations: [
              "Maintain current watering schedule",
              "Apply organic fertilizer",
              "Monitor for pest activity",
            ],
          })
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const t = {
    en: {
      title: "Crop Management",
      subtitle: "Monitor and manage your crops with AI-powered insights",
      analyze: "AI Analyzer",
      createNew: "Create Crop",
      alerts: "Alerts",
      filters: "Filters",
      all: "All",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      critical: "Critical",
      viewDetails: "Details",
      manage: "Manage",
      growth: "Growth Progress",
      deleteCrop: "Delete Crop",
      deleteConfirmTitle: "Delete Crop?",
      deleteConfirmMessage: "Are you sure you want to delete this crop? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      cropDeleted: "Crop deleted successfully",
    },
    ar: {
      title: "إدارة المحاصيل",
      subtitle: "راقب وأدر محاصيلك برؤى مدعومة بالذكاء الاصطناعي",
      analyze: "محلل الذكاء الاصطناعي",
      createNew: "إنشاء محصول",
      alerts: "التنبيهات",
      filters: "الفلاتر",
      all: "الكل",
      excellent: "ممتاز",
      good: "جيد",
      fair: "مقبول",
      critical: "حرج",
      viewDetails: "التفاصيل",
      manage: "إدارة",
      growth: "تقدم النمو",
      deleteCrop: "حذف المحصول",
      deleteConfirmTitle: "حذف المحصول؟",
      deleteConfirmMessage: "هل أنت متأكد أنك تريد حذف هذا المحصول؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      cropDeleted: "تم حذف المحصول بنجاح",
    },
  }

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const matchesSearch =
        !searchQuery ||
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.area.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = filterHealth === "all" || crop.health === filterHealth

      const notDeleted = !deletedCropIds.includes(crop.id)

      return matchesSearch && matchesFilter && notDeleted
    })
  }, [searchQuery, filterHealth, deletedCropIds])

  const handleDeleteCrop = (crop: Crop) => {
    setCropToDelete(crop)
    setShowDeleteConfirm(true)
    // Close any open modals
    setManageCrop(null)
    setSelectedCrop(null)
  }

  const confirmDelete = () => {
    if (cropToDelete) {
      setDeletedCropIds([...deletedCropIds, cropToDelete.id])
      setShowDeleteConfirm(false)
      setCropToDelete(null)
    }
  }

  return (
    <div className="p-4 md:p-8" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">{t[currentLanguage].title}</h1>
          <p className="text-gray-600">{t[currentLanguage].subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Bell size={20} />
            <span>{t[currentLanguage].alerts}</span>
            <span
              className={`absolute -top-1 ${currentLanguage === "ar" ? "-left-1" : "-right-1"} bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
            >
              {notifications.length}
            </span>
          </button>
          <button
            onClick={() => setShowCreateCrop(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>{t[currentLanguage].createNew}</span>
          </button>
          <button
            onClick={() => setShowAnalyzer(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Camera size={20} />
            <span>{t[currentLanguage].analyze}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="text-gray-700">{t[currentLanguage].filters}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "excellent", "good", "warning", "critical"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterHealth(status)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterHealth === status
                    ? "bg-green-600 text-white shadow-md"
                    : status === "all"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : status === "excellent"
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : status === "good"
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : status === "warning"
                            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                }`}
              >
                {t[currentLanguage][status === "fair" ? "fair" : status === "warning" ? "fair" : status]}
              </button>
            ))}
          </div>
        </div>
        {filteredCrops.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {currentLanguage === "ar" ? "لم يتم العثور على محاصيل" : "No crops found"}
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Notifications & Alerts</h3>
            <button onClick={() => setShowNotifications(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-gray-900">{notif.message}</p>
                  <p className="text-gray-500 text-sm">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => {
          const completedTasks = Object.values(taskStatus[crop.id] || {}).filter(Boolean).length
          const hasCompletedTasks = completedTasks > 0

          return (
            <div key={crop.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-6xl">
                {crop.name === "Tomatoes" && "🍅"}
                {crop.name === "Wheat" && "🌾"}
                {crop.name === "Corn" && "🌽"}
                {crop.name === "Carrots" && "🥕"}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{crop.name}</h3>
                    <p className="text-gray-600">{crop.variety}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getHealthColor(crop.health)}`}>{crop.health}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t[currentLanguage].growth}</span>
                    <span className="text-gray-900">{crop.growth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${crop.growth}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{farmingRoutines.find((r) => r.id === crop.routineId)?.icon}</span>
                    <div className="flex-1">
                      <p className="text-green-900 font-medium text-sm">
                        {currentLanguage === "ar" ? "الروتين المستخدم" : "Using Routine"}:
                      </p>
                      <p className="text-green-700 text-xs">{crop.routine}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCrop(crop)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t[currentLanguage].viewDetails}
                  </button>
                  <button
                    onClick={() => setManageCrop(crop)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      hasCompletedTasks
                        ? "bg-green-100 border-2 border-green-500 text-green-700 hover:bg-green-200"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {t[currentLanguage].manage}
                      {hasCompletedTasks && (
                        <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {completedTasks}
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Crop Modal - Step 1 */}
      {showCreateCrop && !showRoutineSelection && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900">{currentLanguage === "ar" ? "إنشاء محصول جديد" : "Create New Crop"}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentLanguage === "ar" ? "الخطوة 1 من 2: معلومات أساسية" : "Step 1 of 2: Basic Information"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCreateCrop(false)
                  setNewCropData({
                    name: "",
                    variety: "",
                    area: "",
                    plantedDate: "",
                    routineId: "",
                  })
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "اسم المحصول" : "Crop Name"}
                </label>
                <input
                  type="text"
                  placeholder={currentLanguage === "ar" ? "مثال: طماطم، قمح، ذرة" : "e.g., Tomatoes, Wheat, Corn"}
                  value={newCropData.name}
                  onChange={(e) =>
                    setNewCropData({
                      ...newCropData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{currentLanguage === "ar" ? "الصنف" : "Variety"}</label>
                <input
                  type="text"
                  placeholder={
                    currentLanguage === "ar" ? "مثال: طماطم الكرز، قمح الشتاء" : "e.g., Cherry Tomato, Winter Wheat"
                  }
                  value={newCropData.variety}
                  onChange={(e) =>
                    setNewCropData({
                      ...newCropData,
                      variety: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "المنطقة / الموقع" : "Area / Location"}
                </label>
                <input
                  type="text"
                  placeholder={
                    currentLanguage === "ar" ? "مثال: الدفيئة 2، الحقل الشمالي" : "e.g., Greenhouse 2, North Field"
                  }
                  value={newCropData.area}
                  onChange={(e) =>
                    setNewCropData({
                      ...newCropData,
                      area: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "تاريخ الزراعة" : "Planted Date"}
                </label>
                <input
                  type="date"
                  value={newCropData.plantedDate}
                  onChange={(e) =>
                    setNewCropData({
                      ...newCropData,
                      plantedDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCreateCrop(false)
                  setNewCropData({
                    name: "",
                    variety: "",
                    area: "",
                    plantedDate: "",
                    routineId: "",
                  })
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {currentLanguage === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  setShowCreateCrop(false)
                  setShowRoutineSelection(true)
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {currentLanguage === "ar" ? "التالي: اختر روتين" : "Next: Choose Routine"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Routine Selection Modal - Step 2 */}
      {showRoutineSelection && !showCustomRoutine && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div>
                <h2 className="text-gray-900">
                  {currentLanguage === "ar" ? "اختر روتين زراعي" : "Choose Farming Routine"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentLanguage === "ar"
                    ? "الخطوة 2 من 2: حدد روتين العناية بالمحصول"
                    : "Step 2 of 2: Select your crop care routine"}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-gray-900 mb-2">
                  {currentLanguage === "ar" ? "⭐ الروتينات الموصى بها" : "⭐ Recommended Routines"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {currentLanguage === "ar"
                    ? "استنادًا إلى معدلات النجاح والأداء"
                    : "Based on success rates and performance"}
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {farmingRoutines
                  .sort((a, b) => b.successRate - a.successRate)
                  .map((routine) => (
                    <div
                      key={routine.id}
                      onClick={() =>
                        setNewCropData({
                          ...newCropData,
                          routineId: routine.id,
                        })
                      }
                      className={`border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg ${
                        newCropData.routineId === routine.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{routine.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-gray-900">{routine.name}</h4>
                            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                              <span className="text-green-700 text-sm font-medium">{routine.successRate}%</span>
                              <span className="text-green-600 text-xs">
                                {currentLanguage === "ar" ? "نجاح" : "success"}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{routine.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>📋</span>
                              <span>
                                {currentLanguage === "ar" ? "التكرار" : "Frequency"}: {routine.frequency}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`px-2 py-1 rounded ${
                                  routine.difficulty === "beginner"
                                    ? "bg-green-100 text-green-700"
                                    : routine.difficulty === "intermediate"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {currentLanguage === "ar"
                                  ? routine.difficulty === "beginner"
                                    ? "مبتدئ"
                                    : routine.difficulty === "intermediate"
                                      ? "متوسط"
                                      : "متقدم"
                                  : routine.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">
                              {currentLanguage === "ar" ? "المهام الرئيسية:" : "Key Tasks:"}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {routine.tasks.slice(0, 3).map((task, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {task}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowRoutineSelection(false)
                    setShowCustomRoutine(true)
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {currentLanguage === "ar" ? "+ إنشاء روتين مخصص" : "+ Create Custom Routine"}
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRoutineSelection(false)
                  setShowCreateCrop(true)
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {currentLanguage === "ar" ? "رجوع" : "Back"}
              </button>
              <button
                onClick={() => {
                  console.log("Creating crop with routine:", newCropData)
                  setShowRoutineSelection(false)
                  setNewCropData({
                    name: "",
                    variety: "",
                    area: "",
                    plantedDate: "",
                    routineId: "",
                  })
                }}
                disabled={!newCropData.routineId}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentLanguage === "ar" ? "إنشاء محصول" : "Create Crop"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Routine Modal */}
      {showCustomRoutine && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {currentLanguage === "ar" ? "إنشاء روتين مخصص" : "Create Custom Routine"}
              </h2>
              <button
                onClick={() => {
                  setShowCustomRoutine(false)
                  setShowRoutineSelection(true)
                  setCustomRoutine({
                    name: "",
                    tasks: [""],
                    frequency: "",
                  })
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "اسم الروتين" : "Routine Name"}
                </label>
                <input
                  type="text"
                  placeholder={currentLanguage === "ar" ? "مثال: روتين الري الخاص بي" : "e.g., My Irrigation Routine"}
                  value={customRoutine.name}
                  onChange={(e) =>
                    setCustomRoutine({
                      ...customRoutine,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{currentLanguage === "ar" ? "التكرار" : "Frequency"}</label>
                <input
                  type="text"
                  placeholder={
                    currentLanguage === "ar" ? "مثال: يوميًا، مرتين في الأسبوع" : "e.g., Daily, Twice per week"
                  }
                  value={customRoutine.frequency}
                  onChange={(e) =>
                    setCustomRoutine({
                      ...customRoutine,
                      frequency: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{currentLanguage === "ar" ? "المهام" : "Tasks"}</label>
                {customRoutine.tasks.map((task, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={currentLanguage === "ar" ? `مهمة ${index + 1}` : `Task ${index + 1}`}
                      value={task}
                      onChange={(e) => {
                        const newTasks = [...customRoutine.tasks]
                        newTasks[index] = e.target.value
                        setCustomRoutine({
                          ...customRoutine,
                          tasks: newTasks,
                        })
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {customRoutine.tasks.length > 1 && (
                      <button
                        onClick={() => {
                          const newTasks = customRoutine.tasks.filter((_, i) => i !== index)
                          setCustomRoutine({
                            ...customRoutine,
                            tasks: newTasks,
                          })
                        }}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setCustomRoutine({
                      ...customRoutine,
                      tasks: [...customRoutine.tasks, ""],
                    })
                  }
                  className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  {currentLanguage === "ar" ? "+ إضافة مهمة" : "+ Add Task"}
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCustomRoutine(false)
                  setShowRoutineSelection(true)
                  setCustomRoutine({
                    name: "",
                    tasks: [""],
                    frequency: "",
                  })
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {currentLanguage === "ar" ? "رجوع" : "Back"}
              </button>
              <button
                onClick={() => {
                  console.log("Creating custom routine:", customRoutine)
                  setNewCropData({
                    ...newCropData,
                    routineId: "custom",
                  })
                  setShowCustomRoutine(false)
                  setCustomRoutine({
                    name: "",
                    tasks: [""],
                    frequency: "",
                  })
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {currentLanguage === "ar" ? "حفظ واستخدام الروتين" : "Save & Use Routine"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && cropToDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-gray-900">{t[currentLanguage].deleteConfirmTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6">{t[currentLanguage].deleteConfirmMessage}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
                    {cropToDelete.name === "Tomatoes" && "🍅"}
                    {cropToDelete.name === "Wheat" && "🌾"}
                    {cropToDelete.name === "Corn" && "🌽"}
                    {cropToDelete.name === "Carrots" && "🥕"}
                  </span>
                  <div>
                    <p className="text-red-900 font-medium">{cropToDelete.name}</p>
                    <p className="text-red-700 text-sm">{cropToDelete.variety}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setCropToDelete(null)
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t[currentLanguage].cancel}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <span>🗑️</span>
                  {t[currentLanguage].delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analyzer Modal */}
      {showAnalyzer && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">AI Crop Analyzer</h2>
              <button
                onClick={() => {
                  setShowAnalyzer(false)
                  setUploadedImage(null)
                  setAnalysisResult(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {!uploadedImage ? (
                <div className="space-y-4">
                  <label className="block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-900 mb-2">Upload crop image</p>
                      <p className="text-gray-500">Click to browse or drag and drop</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                  </label>
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                      <Camera size={20} />
                      <span>Take Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {!analysisResult ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                      <p className="text-gray-600">Analyzing crop health...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        className={`p-4 rounded-lg ${
                          analysisResult.health === "healthy"
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={analysisResult.health === "healthy" ? "text-green-900" : "text-red-900"}>
                            {analysisResult.health === "healthy" ? "Healthy Crop" : "Issues Detected"}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              analysisResult.health === "healthy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {analysisResult.confidence}% confidence
                          </span>
                        </div>
                        {analysisResult.issues.length > 0 && (
                          <div className="mt-3">
                            <p className="text-red-900 mb-2">Detected Issues:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {analysisResult.issues.map((issue: string, idx: number) => (
                                <li key={idx} className="text-red-700">
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="text-blue-900 mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="text-blue-700">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manage Crop Modal */}
      {manageCrop && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {currentLanguage === "ar" ? "إدارة" : "Manage"} {manageCrop.name}
              </h2>
              <button onClick={() => setManageCrop(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      water: !taskStatus[manageCrop.id]?.water,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "جدول الري" : "Water Schedule"}</span>
                </div>
                {taskStatus[manageCrop.id]?.water && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      fertilize: !taskStatus[manageCrop.id]?.fertilize,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌿</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "التسميد" : "Fertilize"}</span>
                </div>
                {taskStatus[manageCrop.id]?.fertilize && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      pest: !taskStatus[manageCrop.id]?.pest,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐛</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "مكافحة الآفات" : "Pest Control"}</span>
                </div>
                {taskStatus[manageCrop.id]?.pest && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      harvest: !taskStatus[manageCrop.id]?.harvest,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌾</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "خطة الحصاد" : "Harvest Plan"}</span>
                </div>
                {taskStatus[manageCrop.id]?.harvest && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <div className="pt-3 border-t border-gray-200 space-y-3">
                <button
                  onClick={() => {
                    setManageCrop(null)
                    setShowAnalyzer(true)
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🔬</span>
                  <span>{currentLanguage === "ar" ? "تحليل صحة المحصول" : "Analyze Crop Health"}</span>
                </button>

                <button
                  onClick={() => handleDeleteCrop(manageCrop)}
                  className="w-full px-6 py-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🗑️</span>
                  <span>{t[currentLanguage].deleteCrop}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Details Modal */}
      {selectedCrop && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {selectedCrop.name} {currentLanguage === "ar" ? "التفاصيل" : "Details"}
              </h2>
              <button onClick={() => setSelectedCrop(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-900 mb-4">
                    {currentLanguage === "ar" ? "معلومات أساسية" : "Basic Information"}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{currentLanguage === "ar" ? "الصنف" : "Variety"}</p>
                      <p className="text-gray-900">{selectedCrop.variety}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{currentLanguage === "ar" ? "الموقع" : "Location"}</p>
                      <p className="text-gray-900">{selectedCrop.area}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "حالة الصحة" : "Health Status"}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${getHealthColor(selectedCrop.health)}`}
                      >
                        {selectedCrop.health}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-4">{currentLanguage === "ar" ? "مقاييس النمو" : "Growth Metrics"}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "تقدم النمو" : "Growth Progress"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.growth}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "رطوبة التربة" : "Soil Moisture"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.soilMoisture}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "درجة الحرارة" : "Temperature"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.temperature}°C</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{farmingRoutines.find((r) => r.id === selectedCrop.routineId)?.icon}</span>
                  <h4 className="text-green-900 font-medium">
                    {currentLanguage === "ar" ? "الروتين المستخدم" : "Using Routine"}
                  </h4>
                </div>
                <p className="text-green-700">{selectedCrop.routine}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteCrop(selectedCrop)}
                  className="w-full px-6 py-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🗑️</span>
                  <span>{t[currentLanguage].deleteCrop}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && cropToDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-gray-900">{t[currentLanguage].deleteConfirmTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6">{t[currentLanguage].deleteConfirmMessage}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
                    {cropToDelete.name === "Tomatoes" && "🍅"}
                    {cropToDelete.name === "Wheat" && "🌾"}
                    {cropToDelete.name === "Corn" && "🌽"}
                    {cropToDelete.name === "Carrots" && "🥕"}
                  </span>
                  <div>
                    <p className="text-red-900 font-medium">{cropToDelete.name}</p>
                    <p className="text-red-700 text-sm">{cropToDelete.variety}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setCropToDelete(null)
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t[currentLanguage].cancel}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <span>🗑️</span>
                  {t[currentLanguage].delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAnalyzer && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">AI Crop Analyzer</h2>
              <button
                onClick={() => {
                  setShowAnalyzer(false)
                  setUploadedImage(null)
                  setAnalysisResult(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {!uploadedImage ? (
                <div className="space-y-4">
                  <label className="block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-900 mb-2">Upload crop image</p>
                      <p className="text-gray-500">Click to browse or drag and drop</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                  </label>
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                      <Camera size={20} />
                      <span>Take Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {!analysisResult ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                      <p className="text-gray-600">Analyzing crop health...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        className={`p-4 rounded-lg ${
                          analysisResult.health === "healthy"
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={analysisResult.health === "healthy" ? "text-green-900" : "text-red-900"}>
                            {analysisResult.health === "healthy" ? "Healthy Crop" : "Issues Detected"}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              analysisResult.health === "healthy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {analysisResult.confidence}% confidence
                          </span>
                        </div>
                        {analysisResult.issues.length > 0 && (
                          <div className="mt-3">
                            <p className="text-red-900 mb-2">Detected Issues:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {analysisResult.issues.map((issue: string, idx: number) => (
                                <li key={idx} className="text-red-700">
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="text-blue-900 mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="text-blue-700">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manage Crop Modal */}
      {manageCrop && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {currentLanguage === "ar" ? "إدارة" : "Manage"} {manageCrop.name}
              </h2>
              <button onClick={() => setManageCrop(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      water: !taskStatus[manageCrop.id]?.water,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "جدول الري" : "Water Schedule"}</span>
                </div>
                {taskStatus[manageCrop.id]?.water && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      fertilize: !taskStatus[manageCrop.id]?.fertilize,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌿</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "التسميد" : "Fertilize"}</span>
                </div>
                {taskStatus[manageCrop.id]?.fertilize && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      pest: !taskStatus[manageCrop.id]?.pest,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐛</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "مكافحة الآفات" : "Pest Control"}</span>
                </div>
                {taskStatus[manageCrop.id]?.pest && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <button
                onClick={() => {
                  setTaskStatus({
                    ...taskStatus,
                    [manageCrop.id]: {
                      ...taskStatus[manageCrop.id],
                      harvest: !taskStatus[manageCrop.id]?.harvest,
                    },
                  })
                }}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌾</span>
                  <span className="text-gray-900">{currentLanguage === "ar" ? "خطة الحصاد" : "Harvest Plan"}</span>
                </div>
                {taskStatus[manageCrop.id]?.harvest && <span className="text-green-600 text-2xl">✓</span>}
              </button>

              <div className="pt-3 border-t border-gray-200 space-y-3">
                <button
                  onClick={() => {
                    setManageCrop(null)
                    setShowAnalyzer(true)
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🔬</span>
                  <span>{currentLanguage === "ar" ? "تحليل صحة المحصول" : "Analyze Crop Health"}</span>
                </button>

                <button
                  onClick={() => handleDeleteCrop(manageCrop)}
                  className="w-full px-6 py-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🗑️</span>
                  <span>{t[currentLanguage].deleteCrop}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Details Modal */}
      {selectedCrop && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {selectedCrop.name} {currentLanguage === "ar" ? "التفاصيل" : "Details"}
              </h2>
              <button onClick={() => setSelectedCrop(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-900 mb-4">
                    {currentLanguage === "ar" ? "معلومات أساسية" : "Basic Information"}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{currentLanguage === "ar" ? "الصنف" : "Variety"}</p>
                      <p className="text-gray-900">{selectedCrop.variety}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{currentLanguage === "ar" ? "الموقع" : "Location"}</p>
                      <p className="text-gray-900">{selectedCrop.area}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "حالة الصحة" : "Health Status"}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${getHealthColor(selectedCrop.health)}`}
                      >
                        {selectedCrop.health}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-4">{currentLanguage === "ar" ? "مقاييس النمو" : "Growth Metrics"}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "تقدم النمو" : "Growth Progress"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.growth}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "رطوبة التربة" : "Soil Moisture"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.soilMoisture}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        {currentLanguage === "ar" ? "درجة الحرارة" : "Temperature"}
                      </p>
                      <p className="text-gray-900">{selectedCrop.temperature}°C</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{farmingRoutines.find((r) => r.id === selectedCrop.routineId)?.icon}</span>
                  <h4 className="text-green-900 font-medium">
                    {currentLanguage === "ar" ? "الروتين المستخدم" : "Using Routine"}
                  </h4>
                </div>
                <p className="text-green-700">{selectedCrop.routine}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteCrop(selectedCrop)}
                  className="w-full px-6 py-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🗑️</span>
                  <span>{t[currentLanguage].deleteCrop}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && cropToDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-gray-900">{t[currentLanguage].deleteConfirmTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6">{t[currentLanguage].deleteConfirmMessage}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
                    {cropToDelete.name === "Tomatoes" && "🍅"}
                    {cropToDelete.name === "Wheat" && "🌾"}
                    {cropToDelete.name === "Corn" && "🌽"}
                    {cropToDelete.name === "Carrots" && "🥕"}
                  </span>
                  <div>
                    <p className="text-red-900 font-medium">{cropToDelete.name}</p>
                    <p className="text-red-700 text-sm">{cropToDelete.variety}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setCropToDelete(null)
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t[currentLanguage].cancel}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <span>🗑️</span>
                  {t[currentLanguage].delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAnalyzer && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">AI Crop Analyzer</h2>
              <button
                onClick={() => {
                  setShowAnalyzer(false)
                  setUploadedImage(null)
                  setAnalysisResult(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {!uploadedImage ? (
                <div className="space-y-4">
                  <label className="block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-900 mb-2">Upload crop image</p>
                      <p className="text-gray-500">Click to browse or drag and drop</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                  </label>
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                      <Camera size={20} />
                      <span>Take Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {!analysisResult ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                      <p className="text-gray-600">Analyzing crop health...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        className={`p-4 rounded-lg ${
                          analysisResult.health === "healthy"
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={analysisResult.health === "healthy" ? "text-green-900" : "text-red-900"}>
                            {analysisResult.health === "healthy" ? "Healthy Crop" : "Issues Detected"}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              analysisResult.health === "healthy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {analysisResult.confidence}% confidence
                          </span>
                        </div>
                        {analysisResult.issues.length > 0 && (
                          <div className="mt-3">
                            <p className="text-red-900 mb-2">Detected Issues:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {analysisResult.issues.map((issue: string, idx: number) => (
                                <li key={idx} className="text-red-700">
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="text-blue-900 mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="text-blue-700">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
