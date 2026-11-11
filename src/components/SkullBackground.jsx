
import { Skull } from 'lucide-react';

const SkullBackground = ({ children }) => {
  const skulls = [
    { top: '-10%', left: '-10%', size: 'w-96 h-96', rotate: '-20deg' },
    { top: '5%', left: '75%', size: 'w-60 h-60', rotate: '15deg' },
    { top: '25%', left: '20%', size: 'w-64 h-64', rotate: '20deg' },
    { top: '75%', left: '80%', size: 'w-72 h-72', rotate: '-15deg' },
    { top: '32%', left: '90%', size: 'w-80 h-80', rotate: '10deg' },
    { top: '65%', left: '30%', size: 'w-96 h-96', rotate: '-10deg' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900">

      {/* Calaveras decorativas */}
      <div className="absolute inset-0 pointer-events-none w-">

        {skulls.map((skull, index) => (
          <Skull
            key={index}
            className={`absolute ${skull.size} text-purple-300 opacity-15`}
            style={{
              top: skull.top,
              left: skull.left,
              transform: `rotate(${skull.rotate})`,
            }}
            strokeWidth={1.2}
          />
        ))}

      </div>

      {/* Contenido principal */}
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        {children}
      </main>

    </div>
  );
};

export default SkullBackground;
