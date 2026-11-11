import { useState } from 'react'

import './App.css'

import Rating from './components/Rating'
import RatingStatistics from './components/RatingStatistics'
import { Menu, X } from 'lucide-react'
import SkullBackground from './components/SkullBackground'

function App () {
  const [refreshKey, setRefreshKey] = useState(0)

  // Actualizar cuando se registre una calificación
  const handleRatingSaved = () => {
    setRefreshKey(prev => prev + 1)
  }

  const [showStatistics, setShowStatistics] = useState(false)

  return (
    <>
    <SkullBackground>
      <div className='flex text-center h-screen items-center justify-center'>
        <Rating onRatingSaved={handleRatingSaved} />
        {/* <RatingStatistics refreshKey={refreshKey} /> */}

        <button
          onClick={() => setShowStatistics(true)}
          className='absolute top-5 right-5 z-20 p-2 text-white hover:bg-white/10 rounded-lg transition'
          aria-label='Abrir estadísticas'
        >
          <Menu />
        </button>

        {showStatistics && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'>
            <div className='relative rounded-2xl bg-white shadow-2xl'>
              {/* Botón cerrar */}
              <button
                onClick={() => setShowStatistics(false)}
                className='absolute right-4 top-4 text-gray-500 hover:text-gray-900 text-2xl'
                aria-label='Cerrar estadísticas'
              >
                <X />
              </button>

              {/* Estadísticas */}
              <div className='mt-6'>
                <RatingStatistics refreshKey={refreshKey} />
              </div>
            </div>
          </div>
        )}
      </div>
      </SkullBackground>
    </>
  )
}

export default App
