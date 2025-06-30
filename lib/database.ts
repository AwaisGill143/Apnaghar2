import { supabase } from "./supabase-client"
import type { Property, User, Investment, ShariahBoardMember } from "./supabase"

// Properties
export async function getProperties(shariahOnly = false) {
  try {
    let query = supabase.from("properties").select("*").order("created_at", { ascending: false })

    if (shariahOnly) {
      query = query.eq("shariah_compliant", true)
    }

    const { data, error } = await query
    if (error) {
      console.error("Error fetching properties:", error)
      throw error
    }
    return data as Property[]
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getProperty(id: string) {
  try {
    const { data, error } = await supabase.from("properties").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching property:", error)
      throw error
    }
    return data as Property
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Users
export async function createUser(userData: Partial<User>) {
  try {
    const { data, error } = await supabase.from("users").insert(userData).select().single()

    if (error) {
      console.error("Error creating user:", error)
      throw error
    }
    return data as User
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getUser(id: string) {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching user:", error)
      throw error
    }
    return data as User
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function updateUser(id: string, updates: Partial<User>) {
  try {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating user:", error)
      throw error
    }
    return data as User
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Investments
export async function createInvestment(investmentData: Partial<Investment>) {
  try {
    const { data, error } = await supabase.from("investments").insert(investmentData).select().single()

    if (error) {
      console.error("Error creating investment:", error)
      throw error
    }
    return data as Investment
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getUserInvestments(userId: string) {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select(`
        *,
        property:properties(*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user investments:", error)
      throw error
    }
    return data as Investment[]
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Shariah Board
export async function getShariahBoard() {
  try {
    const { data, error } = await supabase
      .from("shariah_board")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching Shariah board:", error)
      throw error
    }
    return data as ShariahBoardMember[]
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Notifications
export async function createNotification(notificationData: {
  user_id: string
  title: string
  title_ur?: string
  message: string
  message_ur?: string
  type: string
  data?: any
}) {
  try {
    const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()

    if (error) {
      console.error("Error creating notification:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getUserNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user notifications:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Push Subscriptions
export async function savePushSubscription(userId: string, subscription: any) {
  try {
    const { data, error } = await supabase
      .from("push_subscriptions")
      .insert({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving push subscription:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}
