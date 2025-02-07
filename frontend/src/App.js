import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/DashBoard'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from './components/Header'
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="p-4 md:p-8">
          <Dashboard />
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  )
}

export default App