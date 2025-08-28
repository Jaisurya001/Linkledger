import LoadingTestNav from "@/components/LoadingTestNav"

export default function TestLoadingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <LoadingTestNav />
      {children}
    </div>
  )
}
