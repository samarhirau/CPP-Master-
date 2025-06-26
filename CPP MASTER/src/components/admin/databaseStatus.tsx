"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react"

interface DatabaseStatus {
  connected: boolean
  message: string
  details?: {
    host?: string
    database?: string
    collections?: string[]
    userCount?: number
    problemCount?: number
  }
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>({
    connected: false,
    message: "Checking connection...",
  })
  const [loading, setLoading] = useState(true)

  const checkConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/database/status")
      const result = await response.json()
      setStatus(result)
    } catch (error) {
      setStatus({
        connected: false,
        message: "Failed to check database connection",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Database Status</CardTitle>
              <p className="text-sm text-gray-600">MongoDB connection status</p>
            </div>
          </div>
          <Button onClick={checkConnection} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {status.connected ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <div className="flex-1">
            <Badge variant={status.connected ? "default" : "destructive"} className="mb-2">
              {status.connected ? "Connected" : "Disconnected"}
            </Badge>
            <p className="text-sm text-gray-600">{status.message}</p>
          </div>
        </div>

        {status.details && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <h4 className="font-medium text-gray-900">Connection Details</h4>
            {status.details.host && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Host:</span>
                <span className="font-mono">{status.details.host}</span>
              </div>
            )}
            {status.details.database && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Database:</span>
                <span className="font-mono">{status.details.database}</span>
              </div>
            )}
            {status.details.collections && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Collections:</span>
                <span>{status.details.collections.join(", ")}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{status.details.userCount ?? 0}</div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{status.details.problemCount ?? 0}</div>
                <div className="text-xs text-gray-500">Problems</div>
              </div>
            </div>
          </div>
        )}

        {!status.connected && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Connection Issues</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Make sure your MongoDB connection string is correct in your .env.local file:
                </p>
                <code className="block mt-2 p-2 bg-amber-100 rounded text-xs font-mono">
                  MONGODB_URI=mongodb://localhost:27017/your-database-name
                </code>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
