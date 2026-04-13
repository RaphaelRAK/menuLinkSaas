import * as React from 'react'

import { Button } from '@/components/ui/button'

function GoogleMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.656 29.266 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.88 19.51C14.655 15.108 18.958 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.36 4.327-17.694 10.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.245 0-9.62-3.323-11.28-7.946l-6.52 5.025C9.505 39.556 16.227 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.06 12.06 0 0 1-4.084 5.565l.002-.001 6.19 5.238C36.972 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917Z"
      />
    </svg>
  )
}

export type OAuthProviderName = 'google'

export function OAuthButtons({
  onGoogle,
  loadingProvider,
}: {
  onGoogle: () => void
  loadingProvider: OAuthProviderName | null
}) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center gap-2"
        disabled={loadingProvider !== null}
        onClick={onGoogle}
      >
        <GoogleMark className="size-4" />
        Continuer avec Google
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-muted-foreground">Ou continuer avec</span>
        </div>
      </div>
    </div>
  )
}

