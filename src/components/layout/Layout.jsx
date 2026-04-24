import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-0 dark:bg-dark-0 font-sans text-ink-primary dark:text-ink-dark-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}