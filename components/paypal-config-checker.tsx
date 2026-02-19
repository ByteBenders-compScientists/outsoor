"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Settings, RefreshCw, Loader2 } from 'lucide-react'

interface PayPalConfigStatus {
  isConfigured: boolean
  environment: 'sandbox' | 'live' | 'unknown'
  clientId: string | null
  webhookConfigured: boolean
  lastChecked: string
}

export function PayPalConfigChecker() {
  const [configStatus, setConfigStatus] = useState<PayPalConfigStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkConfiguration = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/paypal/config-status')
      const data = await response.json()

      if (data.success) {
        setConfigStatus(data.configStatus)
      } else {
        setError(data.error || 'Failed to check configuration')
      }
    } catch (error) {
      console.error('Error checking PayPal configuration:', error)
      setError('Failed to check configuration')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkConfiguration()
  }, [])

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'sandbox':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
      case 'live':
        return 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
      default:
        return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
    }
  }

  const getEnvironmentIcon = (environment: string) => {
    switch (environment) {
      case 'sandbox':
        return <Settings className="h-4 w-4" />
      case 'live':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (!configStatus) {
    return (
      <Card className="bg-[#1A1B1F] border-[#202126]">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-[#8C5CF7]" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#1A1B1F] border-[#202126]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#FFFFFF] flex items-center gap-2">
          <Settings className="h-5 w-5" />
          PayPal Configuration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            {configStatus.isConfigured ? (
              <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#EF4444]" />
            )}
            <div>
              <p className="font-medium text-[#FFFFFF]">
                {configStatus.isConfigured ? 'Configuration Valid' : 'Configuration Issues'}
              </p>
              <p className="text-sm text-[#A0A0A8]">
                {configStatus.isConfigured 
                  ? 'PayPal is properly configured and ready to use'
                  : 'Some configuration issues were detected'
                }
              </p>
            </div>
          </div>
          <Badge 
            className={configStatus.isConfigured 
              ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
              : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
            }
          >
            {configStatus.isConfigured ? 'Ready' : 'Issues'}
          </Badge>
        </div>

        {/* Environment */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-[#202126]">
          <div className="flex items-center gap-3">
            {getEnvironmentIcon(configStatus.environment)}
            <div>
              <p className="font-medium text-[#FFFFFF]">Environment</p>
              <p className="text-sm text-[#A0A0A8]">
                {configStatus.environment === 'sandbox' 
                  ? 'Sandbox (Testing)'
                  : configStatus.environment === 'live'
                  ? 'Live (Production)'
                  : 'Unknown'
                }
              </p>
            </div>
          </div>
          <Badge className={getEnvironmentColor(configStatus.environment)}>
            {configStatus.environment.toUpperCase()}
          </Badge>
        </div>

        {/* Client ID */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-[#202126]">
          <div className="flex items-center gap-3">
            {configStatus.clientId ? (
              <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#EF4444]" />
            )}
            <div>
              <p className="font-medium text-[#FFFFFF]">Client ID</p>
              <p className="text-sm text-[#A0A0A8]">
                {configStatus.clientId 
                  ? 'PayPal client ID is configured'
                  : 'PayPal client ID is missing'
                }
              </p>
            </div>
          </div>
          <Badge 
            className={configStatus.clientId 
              ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
              : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
            }
          >
            {configStatus.clientId ? 'Configured' : 'Missing'}
          </Badge>
        </div>

        {/* Webhook */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-[#202126]">
          <div className="flex items-center gap-3">
            {configStatus.webhookConfigured ? (
              <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#F59E0B]" />
            )}
            <div>
              <p className="font-medium text-[#FFFFFF]">Webhook</p>
              <p className="text-sm text-[#A0A0A8]">
                {configStatus.webhookConfigured 
                  ? 'Webhook is configured for real-time updates'
                  : 'Webhook not configured (optional)'
                }
              </p>
            </div>
          </div>
          <Badge 
            className={configStatus.webhookConfigured 
              ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
              : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
            }
          >
            {configStatus.webhookConfigured ? 'Configured' : 'Optional'}
          </Badge>
        </div>

        {/* Last Checked */}
        <div className="text-xs text-[#5A5A64] text-center">
          Last checked: {new Date(configStatus.lastChecked).toLocaleString()}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={checkConfiguration}
            disabled={isLoading}
            variant="outline"
            className="flex-1 border-[#202126] hover:border-[#8C5CF7]/30 text-[#A0A0A8] hover:text-[#E0E0E0] bg-[#1A1B1F]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-[#EF4444]" />
            <span className="text-sm text-[#EF4444]">{error}</span>
          </div>
        )}

        {/* Configuration Help */}
        {!configStatus.isConfigured && (
          <div className="p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg">
            <h4 className="font-medium text-[#F59E0B] mb-2">Configuration Required</h4>
            <p className="text-sm text-[#F59E0B] mb-3">
              To use PayPal payments, you need to configure the following environment variables:
            </p>
            <div className="space-y-2 text-xs font-mono bg-[#1A1B1F] p-2 rounded border border-[#202126]">
              <div>PAYPAL_TEST=true # or false for live</div>
              <div>PAYPAL_CLIENT_ID_SANDBOX=your_sandbox_client_id</div>
              <div>PAYPAL_CLIENT_SECRET_SANDBOX=your_sandbox_client_secret</div>
              <div>PAYPAL_CLIENT_ID_LIVE=your_live_client_id</div>
              <div>PAYPAL_CLIENT_SECRET_LIVE=your_live_client_secret</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
