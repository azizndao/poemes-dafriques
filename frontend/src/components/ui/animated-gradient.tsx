import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function AnimatedGradient({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={cn(
        'relative p-[2px] overflow-hidden rounded-lg',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      <div className="relative bg-background/95 backdrop-blur-sm rounded-lg">
        {children}
      </div>
    </motion.div>
  )
}
