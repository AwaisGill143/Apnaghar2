"use client"

import { NotificationManager } from "@/components/notification-manager"
import { useLanguage } from "@/contexts/language-context"

export default function NotificationsPage() {
  const { language, isRTL } = useLanguage()

  // In a real app, you'd get this from authentication
  const userId = "sample-user-id"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`text-center mb-8 ${isRTL ? "text-right" : ""}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{language === "ur" ? "نوٹیفکیشنز" : "Notifications"}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === "ur"
            ? "اپنی سرمایہ کاریوں اور ادائیگیوں کے بارے میں اہم اپڈیٹس حاصل کریں"
            : "Stay updated with important information about your investments and payments"}
        </p>
      </div>
      <NotificationManager userId={userId} />
    </div>
  )
}
