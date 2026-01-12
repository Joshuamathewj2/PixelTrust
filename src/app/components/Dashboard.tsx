import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Truck, FileCheck, Scale, ShoppingCart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.png';

const domains = [
  {
    id: 'food-delivery',
    title: 'Food Delivery Platforms',
    icon: Truck,
    color: '#39FF14',
    description: 'Verify supply chain authenticity',
    path: '/domain/food-delivery',
  },
  {
    id: 'fake-news',
    title: 'Fake News Verification',
    icon: FileCheck,
    color: '#2979FF',
    description: 'Combat misinformation with truth',
    path: '/domain/fake-news',
  },
  {
    id: 'legal-evidence',
    title: 'Legal Evidence Validation',
    icon: Scale,
    color: '#B026FF',
    description: 'Ensure courtroom integrity',
    path: '/domain/legal-evidence',
  },
  {
    id: 'online-marketplaces',
    title: 'Online Marketplaces',
    icon: ShoppingCart,
    color: '#FF9100',
    description: 'Trust every transaction',
    path: '/domain/online-marketplaces',
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="min-h-screen relative bg-[#050508] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Layered Technical Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />

        {/* Focused Centered Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[120px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #b026ff 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Ambient Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-[#050508] opacity-60" />
      </div>

      {/* Static gradient cleanup */}

      {/* Top Navigation */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
              <img src={logo} alt="PixelTrust Logo" className="w-full h-full object-contain p-1.5" />
              <div className="absolute inset-0 bg-[#b026ff]/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#b026ff] to-white bg-clip-text text-transparent">
                PixelTrust
              </h1>
              <p className="text-xs text-white/50">Trust Every Pixel</p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Page Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#b026ff] to-white bg-clip-text text-transparent">
            Choose Your Trust Domain
          </h2>
          <p className="text-white/60 text-lg">
            Select a verification domain to get started
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredCard === domain.id;

            return (
              <motion.div
                key={domain.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredCard(domain.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={handleMouseMove}
                onClick={() => navigate(domain.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${domain.color}40, transparent 60%)`,
                  }}
                />

                {/* Card */}
                <div className="relative h-full rounded-2xl overflow-hidden">
                  {/* Border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${domain.color}40, transparent)`,
                    }}
                    animate={{
                      opacity: isHovered ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glass background */}
                  <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 relative"
                      animate={{
                        rotateY: isHovered ? 360 : 0,
                      }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${domain.color}20`,
                          boxShadow: isHovered ? `0 0 30px ${domain.color}60` : 'none',
                        }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: domain.color }}
                        />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {domain.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                      {domain.description}
                    </p>

                    {/* Arrow indicator */}
                    <motion.div
                      className="flex items-center space-x-2 text-sm font-medium"
                      style={{ color: domain.color }}
                      animate={{
                        x: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>

                    {/* Hover effect: scanning line */}
                    {isHovered && (
                      <motion.div
                        className="absolute left-0 right-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)`,
                        }}
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* 3D tilt effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    transform: isHovered
                      ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 30}deg) rotateY(${(mousePosition.x - 200) / 30}deg)`
                      : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </motion.div>
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}
