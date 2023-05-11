import { AuthError } from '@/components/ErrorPages'
import { FeedsPage } from '@/components/feeds'
import { useIsConnected } from '@crossbell/connect-kit'
import React from 'react'

export default function feeds() {
    const isConnected = useIsConnected()
  return (
    <div>
        {isConnected ? (
        <FeedsPage />
        ): (
            <AuthError  />
        )
}
    </div>
  )
}
