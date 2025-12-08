import { useEffect, useState } from 'react';

export default function Cursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const size = 48; // size of the circular cursor

  return (
    <>
      {/* annimated glowing circle */}
      <div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden lg:flex"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate3d(${cursor.x - size / 2}px, ${cursor.y - size / 2}px, 0)`,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #FFD700, #4FC3F7, #FFFFFF, #FFD700)',
          mask: 'radial-gradient(circle, transparent 60%, black 70%)',
          WebkitMask: 'radial-gradient(circle, transparent 60%, black 70%)',
          animation: 'spin 3s linear infinite',
        }}
      />

      {/* the Inner cursor circle */}
      <div
        className="fixed top-0 left-0 z-[1000] pointer-events-none hidden lg:flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate3d(${cursor.x - size / 2}px, ${cursor.y - size / 2}px, 0)`,
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 215, 0, 0.05) 70%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* my custom cursor image */}
        <img
          src="/cursor-icon.png"
          alt="cursor"
          className="w-6 h-6"
          style={{
            filter: `
              drop-shadow(0 0 6px rgba(255, 215, 0, 0.7))
              drop-shadow(0 0 10px rgba(33, 150, 243, 0.5))
              drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))
              brightness(1.1)
              saturate(1.2)
            `,
          }}
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate3d(${cursor.x - size / 2}px, ${cursor.y - size / 2}px, 0) rotate(0deg);
          }
          to {
            transform: translate3d(${cursor.x - size / 2}px, ${cursor.y - size / 2}px, 0) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
