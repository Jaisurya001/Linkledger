export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/black-iphone.png"
          alt="Loading LinkLegder..."
          className="w-24 h-24 object-contain"
        />
        <p className="text-lg font-semibold gradient-text">Loading LinkLedger...</p>
      </div>
    </div>
  )
}
