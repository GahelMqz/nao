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
        <div className='flex text-center min-h-screen items-center justify-center'>
          <Rating onRatingSaved={handleRatingSaved} />

          {/* Botón para abrir estadísticas */}
          <button
            onClick={() => setShowStatistics(true)}
            className='
        absolute top-5 right-5
        z-20 p-2
        text-white
        hover:bg-white/10
        rounded-lg
        transition
      '
            aria-label='Abrir estadísticas'
          >
            <Menu />
          </button>

          {/* Modal de estadísticas */}
          {showStatistics && (
            <div
              className='
          fixed inset-0
          z-50
          flex items-center justify-center
          bg-black/60
          p-2 sm:p-4
        '
            >
              <div
                className='
            relative
            w-full max-w-xl
            max-h-[90dvh]
            overflow-y-auto
            overscroll-contain
            rounded-2xl
            bg-white
            shadow-2xl
          '
              >
                {/* Encabezado del modal */}
                <div
                  className='
              sticky top-0
              z-10
              flex justify-end
              bg-white
              px-4 pt-3
              rounded-t-2xl
            '
                >
                  <button
                    onClick={() => setShowStatistics(false)}
                    className='
                flex items-center justify-center
                w-8 h-8
                rounded-full
                text-gray-500
                hover:bg-gray-100
                hover:text-gray-900
                transition
              '
                    aria-label='Cerrar estadísticas'
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Estadísticas */}
                <div className='px-3 pb-3 sm:px-6 sm:pb-6'>
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
