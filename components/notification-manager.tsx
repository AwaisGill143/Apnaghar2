"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { requestNotificationPermission, subscribeToPushNotifications } from "@/lib/push-notifications"
import { getUserNotifications, createNotification } from "@/lib/database"

interface NotificationManagerProps {
  userId: string
}

export function NotificationManager({ userId }: NotificationManagerProps) {
  const { t, language, isRTL } = useLanguage()
  const [notifications, setNotifications] = useState([])
  const [pushEnabled, setPushEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNotifications() {
      try {
        const userNotifications = await getUserNotifications(userId)
        setNotifications(userNotifications)

        // Check if push notifications are enabled
        const permission = Notification.permission
        setPushEnabled(permission === "granted")
      } catch (error) {
        console.error("Error loading notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [userId])

  const handleEnablePushNotifications = async () => {
    try {
      const granted = await requestNotificationPermission()
      if (granted) {
        await subscribeToPushNotifications(userId)
        setPushEnabled(true)

        // Send welcome notification
        await createNotification({
          user_id: userId,
          title: "Push Notifications Enabled",
          title_ur: "پش نوٹیفکیشن فعال",
          message: "You will now receive important updates about your investments.",
          message_ur: "اب آپ کو اپنی سرمایہ کاریوں کے بارے میں اہم اپڈیٹس ملیں گی۔",
          type: "general",
        })
      }
    } catch (error) {
      console.error("Error enabling push notifications:", error)
    }
  }

  const notificationTypes = [
    {
      type: "investment",
      title: language === "ur" ? "سرمایہ کاری کی اپڈیٹس" : "Investment Updates",
      description:
        language === "ur" ? "نئی سرمایہ کاری کی تصدیق اور اپڈیٹس" : "New investment confirmations and updates",
    },
    {
      type: "payment",
      title: language === "ur" ? "کرائے کی ادائیگی" : "Rental Payments",
      description: language === "ur" ? "ماہانہ کرائے کی ادائیگی کی اطلاع" : "Monthly rental payment notifications",
    },
    {
      type: "kyc",
      title: language === "ur" ? "KYC اپڈیٹس" : "KYC Updates",
      description: language === "ur" ? "KYC کی تصدیق اور دستاویزات" : "KYC verification and document updates",
    },
    {
      type: "shariah",
      title: language === "ur" ? "شریعہ کمپلائنس" : "Shariah Compliance",
      description: language === "ur" ? "شریعہ کمپلائنس کی اپڈیٹس" : "Shariah compliance updates",
    },
  ]

  if (loading) {
    return <div className="text-center py-8">Loading notifications...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""}`}
          >
            <Bell className="h-5 w-5" />
            <span>{language === "ur" ? "نوٹیفکیشن کی ترتیبات" : "Notification Settings"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : ""}>
              <h4 className="font-semibold">{language === "ur" ? "پش نوٹیفکیشن" : "Push Notifications"}</h4>
              <p className="text-sm text-gray-600">
                {language === "ur" ? "اہم اپڈیٹس کے لیے فوری اطلاعات" : "Instant alerts for important updates"}
              </p>
            </div>
            <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              {pushEnabled ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {language === "ur" ? "فعال" : "Enabled"}
                </Badge>
              ) : (
                <Button onClick={handleEnablePushNotifications} size="sm">
                  {language === "ur" ? "فعال کریں" : "Enable"}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className={`font-semibold ${isRTL ? "text-right" : ""}`}>
              {language === "ur" ? "نوٹیفکیشن کی اقسام" : "Notification Types"}
            </h4>
            {notificationTypes.map((type) => (
              <div
                key={type.type}
                className={`flex items-center justify-between p-3 border rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={isRTL ? "text-right" : ""}>
                  <h5 className="font-medium">{type.title}</h5>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : ""}>
            {language === "ur" ? "حالیہ نوٹیفکیشنز" : "Recent Notifications"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className={`text-center py-8 text-gray-500 ${isRTL ? "text-right" : ""}`}>
              <BellOff className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>{language === "ur" ? "کوئی نوٹیفکیشن نہیں" : "No notifications yet"}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 border rounded-lg ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""} ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                >
                  <div className={`mt-1 ${!notification.read ? "text-blue-600" : "text-gray-400"}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">
                      {language === "ur" ? notification.title_ur || notification.title : notification.title}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {language === "ur" ? notification.message_ur || notification.message : notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(notification.sent_at).toLocaleDateString()}</p>
                  </div>
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
