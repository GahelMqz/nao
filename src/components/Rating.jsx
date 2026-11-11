import { useState, useEffect } from 'react'

import logoImg from '../assets/imgs/logo.webp'
import palomaImg from '../assets/imgs/paloma.webp'
import pan1Img from '../assets/imgs/pan-1.webp'
import pan2Img from '../assets/imgs/pan-2.webp'
import pan3Img from '../assets/imgs/pan-3.webp'
import pan4Img from '../assets/imgs/pan-4.webp'
import pan5Img from '../assets/imgs/pan-5.webp'

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

      const response = await fetch('http://localhost:3000/api/ratings', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          score: score
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setMessage('¡Gracias por tu calificación!')
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
              className='w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain'
            />
          </div>

          <h1 class='text-amber-500 uppercase mb-4 text-4xl font-bold text-heading md:text-5xl lg:text-6xl'>
            Califica tu experiencia
          </h1>
          <div className='flex justify-center gap-12'>
            {/* {[1, 2, 3, 4, 5].map(score => (
            <button
              className='rounded cursor-pointer '
              key={score}
              onClick={() => sendRating(score)}
              disabled={loading}
            >
              
              <img
                src={pan1Img}
                alt='Botón'
                className='w-32 sm:w-40 md:w-48 h-auto object-contain'
              />
            </button>
          ))} */}
            {panes.map((image, index) => (
              <button
                className='rounded cursor-pointer transition-transform duration-200 ease-in-out
  hover:scale-105
  active:scale-95'
                key={index}
                onClick={() => sendRating(index + 1)}
                disabled={loading}
              >
                <img
                  src={image}
                  alt={`Calificación ${index + 1}`}
                  className='w-32 sm:w-40 md:w-48 h-auto object-contain'
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de agradecimiento */}
      {message && (
        <div>
          <div className='flex justify-center'>
            <img
              src={palomaImg}
              alt='Logo'
              className='w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain'
            />
          </div>
          <div className='mt-4'>
            <h1 class='text-emerald-500 uppercase mb-4 text-4xl font-bold text-heading md:text-5xl lg:text-6xl'>
              {message}
            </h1>

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
