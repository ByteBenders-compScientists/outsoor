"use client"

import { motion } from "framer-motion"
import {
  MessageSquare,
  ImageIcon,
  Mic,
  Volume2,
  Brain,
  Layers,
  Zap,
  Clock,
  Activity,
  Terminal,
  Globe,
  Sparkles,
  Rocket,
  Code,
  ArrowRight,
  TrendingUp,
  Shield,
  Play,
  BarChart3,
  Key,
  Puzzle,
} from "lucide-react"

// Simple Static Icon Variants - No Wobbling
const iconVariants = {
  idle: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
}

// Static Icon Components - No Animation
export const AnimatedMessageSquare = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <MessageSquare className="w-full h-full" />
  </motion.div>
)

export const AnimatedImageIcon = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <ImageIcon className="w-full h-full" />
  </motion.div>
)

export const AnimatedMic = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Mic className="w-full h-full" />
  </motion.div>
)

export const AnimatedVolume2 = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Volume2 className="w-full h-full" />
  </motion.div>
)

export const AnimatedBrain = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Brain className="w-full h-full" />
  </motion.div>
)

export const AnimatedLayers = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Layers className="w-full h-full" />
  </motion.div>
)

export const AnimatedZap = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Zap className="w-full h-full" />
  </motion.div>
)

export const AnimatedActivity = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Activity className="w-full h-full" />
  </motion.div>
)

export const AnimatedTerminal = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Terminal className="w-full h-full" />
  </motion.div>
)

export const AnimatedGlobe = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Globe className="w-full h-full" />
  </motion.div>
)

export const AnimatedSparkles = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Sparkles className="w-full h-full" />
  </motion.div>
)

export const AnimatedRocket = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Rocket className="w-full h-full" />
  </motion.div>
)

export const AnimatedCode = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Code className="w-full h-full" />
  </motion.div>
)

export const AnimatedArrowRight = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <ArrowRight className="w-full h-full" />
  </motion.div>
)

export const AnimatedTrendingUp = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <TrendingUp className="w-full h-full" />
  </motion.div>
)

export const AnimatedShield = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Shield className="w-full h-full" />
  </motion.div>
)

export const AnimatedClock = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Clock className="w-full h-full" />
  </motion.div>
)

export const AnimatedPlay = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Play className="w-full h-full" />
  </motion.div>
)

export const AnimatedBarChart3 = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <BarChart3 className="w-full h-full" />
  </motion.div>
)

export const AnimatedKey = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Key className="w-full h-full" />
  </motion.div>
)

export const AnimatedPuzzle = ({ className = "" }: { className?: string }) => (
  <motion.div variants={iconVariants} initial="idle" whileHover="hover" whileTap="tap" className={className}>
    <Puzzle className="w-full h-full" />
  </motion.div>
)

// Simple Status Indicator - No Animation
export const AnimatedStatusIndicator = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "tween", duration: 0.3 }}
  >
    <div className="w-3 h-3 bg-green-500 rounded-full" />
    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full opacity-75" />
  </motion.div>
)

// Simple Loading Spinner - Minimal Animation
export const AnimatedLoadingSpinner = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`w-6 h-6 border-2 border-green-500/30 border-t-green-500 rounded-full ${className}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
)

// Static Icon Component - No Morphing
export const MorphingIcon = ({
  icons,
  className = "",
}: {
  icons: any[]
  className?: string
}) => {
  const CurrentIcon = icons[0] // Just show the first icon, no morphing

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className={className}
    >
      <CurrentIcon className="w-full h-full" />
    </motion.div>
  )
}
