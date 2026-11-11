import { useState, useEffect } from 'react'

import logoImg from '../assets/imgs/logo.webp'
import palomaImg from '../assets/imgs/paloma.webp'
import pan1Img from '../assets/imgs/pan-1.webp'
import pan2Img from '../assets/imgs/pan-2.webp'
import pan3Img from '../assets/imgs/pan-3.webp'
import pan4Img from '../assets/imgs/pan-4.webp'
import pan5Img from '../assets/imgs/pan-5.webp'
import Bar from './Bar'

function Rating ({ onRatingSaved }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(0)

  const panes = [pan1Img, pan2Img, pan3Img, pan4Img, pan5Img]

  // Enviar calificación al servidor
  const sendRating = async score => {
    try {
      setLoading(true)
      setMessage('')

      // const response = await fetch('http://localhost:3000/api/ratings', {
      //   method: 'POST',

      //   headers: {
      //     'Content-Type': 'application/json'
      //   },

      //   body: JSON.stringify({
      //     score: score
      //   })
      // })
      const API_URL = import.meta.env.VITE_API_URL

      const response = await fetch(`${API_URL}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setMessage('¡Gracias!')
      onRatingSaved?.()
      // Iniciar cuenta regresiva de 5 segundos
      setCountdown(5)
    } catch (error) {
      console.error(error)
      setMessage('No se pudo registrar tu calificación')
    } finally {
      setLoading(false)
    }
  }

  // Controlar la cuenta regresiva
  useEffect(() => {
    if (countdown <= 0) {
      if (message) {
        setMessage('')
      }

      return
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 750)

    return () => clearTimeout(timer)
  }, [countdown, message])

  // Determinar si se muestran los botones
  const showButtons = countdown === 0 && !message

  return (
    <div>
      {/* Botones de calificación */}
      {showButtons && (
        <div>
          <div className='flex justify-center'>
            <img
              src={logoImg}
              alt='Logo'
              className=' w-full
          max-w-20
          sm:max-w-32
          md:max-w-40
          lg:max-w-48
          mx-auto
          h-auto
          object-contain'
            />
          </div>

          <div
            className='
  text-amber-500
  uppercase
  font-bold
  text-heading
  text-2xl
  sm:text-3xl
  md:text-5xl
  lg:text-6xl
  mt-2
  mb-8
  text-center
  text-balance
  px-3
'
          >
            <h1>Califica</h1>
            <h1>Tu experiencia</h1>
          </div>

          <div
            className='
  grid grid-cols-5
  gap-1 sm:gap-3 md:gap-6
  w-full max-w-5xl
  mx-auto px-2 sm:px-4
'
          >
            {panes.map((image, index) => (
              <button
                key={index}
                onClick={() => sendRating(index + 1)}
                disabled={loading}
                className='
        w-full min-w-0
        cursor-pointer
        transition-transform duration-200 ease-in-out
        hover:scale-110
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
      '
              >
                <img
                  src={image}
                  alt={`Calificación ${index + 1}`}
                  className='
          w-full
          max-w-24
          sm:max-w-32
          md:max-w-40
          lg:max-w-48
          mx-auto
          h-auto
          object-contain
      '
                />
              </button>
            ))}

            
          </div>

          <Bar/>
        </div>
      )}

      {/* Mensaje de agradecimiento */}
      {message && (
        <div>
          <div className='flex justify-center'>
            <img
              src={palomaImg}
              alt='Logo'
              className=' w-full
          max-w-20
          sm:max-w-32
          md:max-w-40
          lg:max-w-48
          mx-auto
          h-auto
          object-contain'
            />
          </div>
          <div className='mt-4'>
            <div
              class='text-emerald-500 uppercase
  font-bold
  text-heading
  text-2xl
  sm:text-3xl
  md:text-5xl
  lg:text-6xl
  mt-2
  mb-8
  text-center
  text-balance
  px-3'
            >
              <h1>{message}</h1>
              <h1>Por tu calificación</h1>
            </div>

            {/* Cuenta regresiva */}
            {countdown > 0 && (
              <p className='mt-2 text-white'>
                Podrás volver a calificar en {countdown} segundos.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Rating
