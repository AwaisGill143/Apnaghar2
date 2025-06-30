"use client"

import { savePushSubscription } from "./database"

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "your-vapid-public-key"

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    throw new Error("This browser does not support notifications")
  }

  const permission = await Notification.requestPermission()
  return permission === "granted"
}

export async function subscribeToPushNotifications(userId: string) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Push notifications are not supported")
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js")

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })

    // Save subscription to database
    await savePushSubscription(userId, subscription.toJSON())

    return subscription
  } catch (error) {
    console.error("Error subscribing to push notifications:", error)
    throw error
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function sendNotification(title: string, body: string, data?: any) {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready
    registration.showNotification(title, {
      body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      data,
      actions: [
        {
          action: "view",
          title: "View Details",
        },
        {
          action: "dismiss",
          title: "Dismiss",
        },
      ],
    })
  }
}
