import Header from '@/components/Header'

export default function TransformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  )
}
// Force cache bust 1784760118
