import { DatabaseSetup } from "@/components/database-setup"

export default function SetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Setup</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Initialize your Apna Ghar database with the required tables and sample data.
        </p>
      </div>
      <DatabaseSetup />
    </div>
  )
}
