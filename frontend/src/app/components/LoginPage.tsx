import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import logo from '../assets/logo.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050508]">
      {/* Layered Futuristic Backgrounds */}
      <div className="absolute inset-0 z-0">
        {/* Ambient Moving Glows */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #b026ff 0%, transparent 70%)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00f0ff 0%, transparent 70%)' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Core Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-[#050508] opacity-80" />
      </div>

      {/* Animated background lines */}
      <motion.div
        className="absolute inset-0 opacity-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#b026ff] to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 3,
            }}
          />
        ))}
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass Card */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Neon border glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#b026ff]/20 via-[#b026ff]/10 to-[#b026ff]/20 blur-xl" />

          {/* Glass background */}
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10">
            {/* Logo/Title Section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="inline-block mb-4 relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b026ff] to-[#7c1cfc] flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                 <img
  src={logo}
  alt="PixelTrust Logo"
  className="w-9 h-9 object-contain"
/>

                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b026ff] to-[#7c1cfc] blur-lg opacity-50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#b026ff] via-white to-[#b026ff] bg-clip-text text-transparent">
                PixelTrust
              </h1>
              <p className="text-sm text-white/60 font-light tracking-wide">
                Trust Every Pixel
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#b026ff] transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 rounded-xl border-2 border-[#b026ff] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-[#b026ff]/10 blur-md" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00f0ff] transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  {focusedField === 'password' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 rounded-xl border-2 border-[#b026ff] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-[#00f0ff]/10 blur-md" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="relative w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#7c1cfc]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#7c1cfc] opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Access Platform</span>
              </motion.button>
            </form>

            {/* Footer text */}
            <motion.p
              className="text-center text-xs text-white/40 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Secured by blockchain technology
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
