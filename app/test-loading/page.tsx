import { Suspense } from 'react'
import Loading from '../loading'

// This component simulates a slow data fetch
async function SlowComponent() {
  // Simulate a slow data fetch (3 seconds)
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold gradient-text mb-4">Content Loaded!</h2>
      <p className="text-gray-700">
        This content was loaded after a 3-second delay to demonstrate the loading state.
      </p>
    </div>
  )
}

export default function TestLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold gradient-text mb-8">Loading State Test</h1>
      
      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          The component below uses Suspense to show the loading state while content is being fetched.
          You should see the purple book walking animation for 3 seconds before the content appears.
        </p>
        
        <div className="border-2 border-purple-200 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Test Component:</h3>
          <Suspense fallback={<Loading />}>
            <SlowComponent />
          </Suspense>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">How to Test Loading States:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Visit any page in your app that fetches data</li>
          <li>The loading state will automatically show while data is being fetched</li>
          <li>For route transitions, the loading state will show while the new page is loading</li>
          <li>You can also manually wrap components in Suspense with the Loading component as fallback</li>
        </ol>
      </div>
    </div>
  )
}
