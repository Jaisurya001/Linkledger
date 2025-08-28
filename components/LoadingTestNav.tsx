"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoadingTestNav() {
  const router = useRouter()
  
  const triggerNavigation = (path: string) => {
    router.push(path)
  }
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-200">
      <h3 className="font-semibold mb-3 gradient-text">Test Loading States</h3>
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="border-purple-200"
          onClick={() => triggerNavigation('/test-loading')}
        >
          Test Page
        </Button>
        <Button 
          variant="outline" 
          className="border-purple-200"
          onClick={() => triggerNavigation('/admin')}
        >
          Admin Page
        </Button>
        <Button 
          variant="outline" 
          className="border-purple-200"
          onClick={() => triggerNavigation('/')}
        >
          Home Page
        </Button>
        <Link href="/test-loading?delay=true" className="text-xs text-center text-purple-600 hover:underline mt-2">
          Test with URL param
        </Link>
      </div>
    </div>
  )
}
