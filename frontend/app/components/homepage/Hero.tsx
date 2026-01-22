'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Box, Sphere, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Floating geometric shapes */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Box position={[-2, 0, 0]} args={[1, 1, 1]}>
            <meshStandardMaterial
              color="#3b82f6"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Float>

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <Sphere position={[2, 1, 0]} args={[0.8, 16, 16]}>
            <meshStandardMaterial
              color="#06b6d4"
              metalness={0.7}
              roughness={0.3}
            />
          </Sphere>
        </Float>

        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
          <Torus position={[0, -1, -1]} args={[0.8, 0.3, 16, 100]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>
        </Float>

        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} />
      </Canvas>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Build Amazing
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            TODO Apps
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The modern way to manage tasks with stunning 3D visuals and smooth animations
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/auth/signin"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity duration-200 inline-flex items-center justify-center"
          >
            Get Started Free
          </Link>
          <Link
            href="/auth/signup"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center justify-center"
          >
            Sign Up
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;