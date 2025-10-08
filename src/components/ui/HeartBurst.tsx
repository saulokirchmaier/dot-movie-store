import { motion, AnimatePresence } from 'framer-motion';

interface HeartBurstProps {
  isActive: boolean;
}

export function HeartBurst({ isActive }: HeartBurstProps) {
  const particles = Array.from({ length: 8 }); // 8 partículas

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-2 pointer-events-none">
          {particles.map((_, index) => {
            const angle = (index * 360) / particles.length;
            const distance = 30;

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * distance,
                  y: Math.sin((angle * Math.PI) / 180) * distance,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #ff6b6b, #ff8787)`,
                    boxShadow: '0 0 8px rgba(255, 107, 107, 0.8)',
                  }}
                />
              </motion.div>
            );
          })}

          {/* Círculo de expansão */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-400"
            initial={{
              scale: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: 2.5,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            style={{
              width: '24px',
              height: '24px',
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
