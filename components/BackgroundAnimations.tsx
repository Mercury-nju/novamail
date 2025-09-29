'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

interface BackgroundAnimationsProps {
  variant?: 'default' | 'hero' | 'features' | 'pricing' | 'dashboard'
  particleCount?: number
  showGrid?: boolean
}

export default function BackgroundAnimations({ 
  variant = 'default',
  particleCount = 8,
  showGrid = true 
}: BackgroundAnimationsProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating blobs */}
      <motion.div 
        style={{ y }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
        className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0.4, 0.7],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating particles */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-primary-300 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Large floating circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern */}
      {showGrid && (
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </motion.div>
      )}

      {/* Variant-specific elements */}
      {variant === 'hero' && (
        <>
          {/* Dynamic gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"
            animate={{
              background: [
                "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)",
                "linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #dbeafe 100%)",
                "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`hero-orb-${i}`}
              className="absolute w-16 h-16 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
                y: [0, -30, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}

      {variant === 'pricing' && (
        <>
          {/* Floating stars for pricing */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`pricing-star-${i}`}
              className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}

      {variant === 'dashboard' && (
        <>
          {/* Subtle dashboard animations */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-primary-100/20 to-blue-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  )
}
