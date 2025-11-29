import { MapPin, Mail, Phone, Calendar, X, Edit } from 'lucide-react';
import { useState } from 'react';

interface FarmProfileProps {
  language: 'en' | 'ar';
}

export function FarmProfile({ language }: FarmProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    farmName: language === 'ar' ? 'مزرعة الوادي الأخضر' : 'Green Valley Farm',
    farmType: language === 'ar' ? 'الزراعة العضوية' : 'Organic Farming',
    location: language === 'ar' ? 'الوادي الريفي، منطقة مزرعة المقاطعة' : 'Rural Valley, County Farm District',
    email: 'contact@greenvalley.com',
    phone: language === 'ar' ? '١٢٣-٤٥٦٧ (٥٥٥) ١+' : '+1 (555) 123-4567',
    established: language === 'ar' ? 'يناير ٢٠١٨' : 'January 2018',
    totalArea: '25.5',
    cultivatedArea: '23.5',
    cropVarieties: '4',
    annualYield: '252',
  });
  const t = {
    en: {
      title: 'Farm Profile',
      subtitle: 'Manage your farm information and settings',
      farmName: 'Green Valley Farm',
      farmType: 'Organic Farming',
      editProfile: 'Edit Profile',
      farmInfo: 'Farm Information',
      location: 'Location',
      email: 'Email',
      phone: 'Phone',
      established: 'Established',
      farmStats: 'Farm Statistics',
      totalArea: 'Total Area',
      cultivated: 'Cultivated Area',
      cropVarieties: 'Crop Varieties',
      annualYield: 'Annual Yield',
      certifications: 'Certifications',
      organicCert: 'Organic Farming Certified',
      sustainableCert: 'Sustainable Agriculture',
      validUntil: 'Valid until',
      locationValue: 'Rural Valley, County Farm District',
      emailValue: 'contact@greenvalley.com',
      phoneValue: '+1 (555) 123-4567',
      establishedValue: 'January 2018',
      hectares: 'hectares',
      types: 'types',
      tons: 'tons',
      editModalTitle: 'Edit Farm Profile',
      farmNameLabel: 'Farm Name',
      farmTypeLabel: 'Farm Type',
      locationLabel: 'Location',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      establishedLabel: 'Established',
      totalAreaLabel: 'Total Area (hectares)',
      cultivatedLabel: 'Cultivated Area (hectares)',
      varietiesLabel: 'Number of Crop Varieties',
      yieldLabel: 'Annual Yield (tons)',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
    },
    ar: {
      title: 'ملف المزرعة',
      subtitle: 'إدارة معلومات مزرعتك وإعداداتها',
      farmName: 'مزرعة الوادي الأخضر',
      farmType: 'الزراعة العضوية',
      editProfile: 'تعديل الملف الشخصي',
      farmInfo: 'معلومات المزرعة',
      location: 'الموقع',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      established: 'تأسست',
      farmStats: 'إحصائيات المزرعة',
      totalArea: 'المساحة الإجمالية',
      cultivated: 'المساحة المزروعة',
      cropVarieties: 'أصناف المحاصيل',
      annualYield: 'الإنتاج السنوي',
      certifications: 'الشهادات',
      organicCert: 'شهادة الزراعة العضوية',
      sustainableCert: 'الزراعة المستدامة',
      validUntil: 'صالح حتى',
      locationValue: 'الوادي الريفي، منطقة مزرعة المقاطعة',
      emailValue: 'contact@greenvalley.com',
      phoneValue: '١٢٣-٤٥٦٧ (٥٥٥) ١+',
      establishedValue: 'يناير ٢٠١٨',
      hectares: 'هكتار',
      types: 'أنواع',
      tons: 'طن',
      editModalTitle: 'تعديل ملف المزرعة',
      farmNameLabel: 'اسم المزرعة',
      farmTypeLabel: 'نوع المزرعة',
      locationLabel: 'الموقع',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      establishedLabel: 'تأسست',
      totalAreaLabel: 'المساحة الإجمالية (هكتار)',
      cultivatedLabel: 'المساحة المزروعة (هكتار)',
      varietiesLabel: 'عدد أصناف المحاصيل',
      yieldLabel: 'الإنتاج السنوي (طن)',
      cancel: 'إلغاء',
      saveChanges: 'حفظ التغييرات',
    },
  };

  return (
    <div className="p-4 md:p-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-6 md:mb-8">
        <h1 className="text-gray-900 mb-2">{t[language].title}</h1>
        <p className="text-gray-600">{t[language].subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl md:text-4xl">
              🌾
            </div>
            <h2 className="text-gray-900 text-center mb-2">{formData.farmName}</h2>
            <p className="text-gray-600 text-center mb-6">{formData.farmType}</p>
            <button 
              onClick={() => setShowEditModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              {t[language].editProfile}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h3 className="text-gray-900 mb-4">{t[language].farmInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm">{t[language].location}</p>
                  <p className="text-gray-900 break-words">{formData.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm">{t[language].email}</p>
                  <p className="text-gray-900 break-all">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm">{t[language].phone}</p>
                  <p className="text-gray-900">{formData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm">{t[language].established}</p>
                  <p className="text-gray-900">{formData.established}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h3 className="text-gray-900 mb-4">{t[language].farmStats}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-600 mb-1 text-sm md:text-base">{t[language].totalArea}</p>
                <p className="text-green-900 text-lg md:text-xl font-medium">{formData.totalArea} {t[language].hectares}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-600 mb-1 text-sm md:text-base">{t[language].cultivated}</p>
                <p className="text-blue-900 text-lg md:text-xl font-medium">{formData.cultivatedArea} {t[language].hectares}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-600 mb-1 text-sm md:text-base">{t[language].cropVarieties}</p>
                <p className="text-yellow-900 text-lg md:text-xl font-medium">{formData.cropVarieties} {t[language].types}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-600 mb-1 text-sm md:text-base">{t[language].annualYield}</p>
                <p className="text-purple-900 text-lg md:text-xl font-medium">{formData.annualYield} {t[language].tons}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h3 className="text-gray-900 mb-4">{t[language].certifications}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 md:p-4 bg-green-50 rounded-lg">
                <span className="text-xl md:text-2xl flex-shrink-0">✓</span>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 font-medium">{t[language].organicCert}</p>
                  <p className="text-gray-600 text-sm">{t[language].validUntil} {language === 'ar' ? 'ديسمبر ٢٠٢٦' : 'Dec 2026'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 md:p-4 bg-blue-50 rounded-lg">
                <span className="text-xl md:text-2xl flex-shrink-0">✓</span>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 font-medium">{t[language].sustainableCert}</p>
                  <p className="text-gray-600 text-sm">{t[language].validUntil} {language === 'ar' ? 'يونيو ٢٠٢٧' : 'Jun 2027'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-xl z-10">
              <h2 className="text-gray-900">{t[language].editModalTitle}</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b pb-2">{t[language].farmInfo}</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t[language].farmNameLabel}</label>
                  <input
                    type="text"
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t[language].farmTypeLabel}</label>
                  <input
                    type="text"
                    value={formData.farmType}
                    onChange={(e) => setFormData({ ...formData, farmType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t[language].locationLabel}</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].emailLabel}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].phoneLabel}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t[language].establishedLabel}</label>
                  <input
                    type="text"
                    value={formData.established}
                    onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b pb-2">{t[language].farmStats}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].totalAreaLabel}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.totalArea}
                      onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].cultivatedLabel}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.cultivatedArea}
                      onChange={(e) => setFormData({ ...formData, cultivatedArea: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].varietiesLabel}</label>
                    <input
                      type="number"
                      value={formData.cropVarieties}
                      onChange={(e) => setFormData({ ...formData, cropVarieties: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{t[language].yieldLabel}</label>
                    <input
                      type="number"
                      value={formData.annualYield}
                      onChange={(e) => setFormData({ ...formData, annualYield: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 text-sm">
                  💡 {language === 'ar' 
                    ? 'سيتم حفظ التغييرات وتحديث ملف مزرعتك فورًا.'
                    : 'Changes will be saved and your farm profile will be updated immediately.'}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0 bg-white/90 backdrop-blur-xl">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={() => {
                  console.log('Saving farm profile:', formData);
                  setShowEditModal(false);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <span>✓</span>
                {t[language].saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
