function Bar () {
  return <>
  
  
{/* Indicador de satisfacción */}
<div className="
  w-full
  max-w-2xl
  mx-auto
  mt-5 sm:mt-7
  px-3
">

  {/* Barra de colores */}
  <div className="
    w-full
    h-2
    rounded-full
    bg-gradient-to-r
    from-red-400
    via-amber-200
    to-green-400
    opacity-80
  "/>

  {/* Escala numérica */}
  <div className="
    grid grid-cols-5
    mt-2
    text-center
    text-sm sm:text-base
    font-medium
    text-white/80
  ">
    {[1, 2, 3, 4, 5].map(number => (
      <span key={number}>
        {number}
      </span>
    ))}
  </div>

  {/* Descripciones */}
  <div className="
    flex justify-between
    mt-2
    text-[10px] sm:text-xs
    font-medium
  ">
    <span className="text-red-300">
      Muy insatisfecho
    </span>

    <span className="text-green-300">
      Muy satisfecho
    </span>
  </div>

</div>

  </>
}

export default Bar
