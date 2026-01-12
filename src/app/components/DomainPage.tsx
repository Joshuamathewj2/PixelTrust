import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import logo from '../../assets/logo.png';

interface DomainPageProps {
  domainKey: string;
  title: string;
  tagline: string;
  color: string;
  description: string;
}

type VerificationStatus = 'idle' | 'verifying' | 'authentic' | 'partial' | 'tampered';

export function DomainPage({ domainKey, title, tagline, color, description }: DomainPageProps) {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Typing animation
  useEffect(() => {
    const fullText = title;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [title]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  interface ForensicSignal {
    name: string;
    severity: string;
    description: string;
  }

  interface ForensicResult {
    score: number;
    risk_level: string;
    signals: ForensicSignal[];
    verdict: string;
    domain_insight: string;
  }

  const [forensicResult, setForensicResult] = useState<ForensicResult | null>(null);

  const handleVerify = async () => {
    if (!uploadedFile) return;

    setVerificationStatus('verifying');

    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('domain', domainKey);

    try {
      const response = await fetch('http://localhost:5000/verify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setForensicResult(data);

      if (data.score > 80) setVerificationStatus('authentic');
      else if (data.score > 50) setVerificationStatus('partial');
      else setVerificationStatus('tampered');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationStatus('tampered'); // Fallback or show error
    }
  };

  const getResultColor = () => {
    if (!forensicResult) return color;
    if (forensicResult.score > 80) return color; // Match domain-specific neon color
    if (forensicResult.score > 50) return '#FFD700'; // Neon Yellow for partial
    return '#FF1744'; // Neon Red for tampered
  };

  const getMotionEffects = () => {
    switch (domainKey) {
      case 'food-delivery':
        return {
          animation: 'flow',
          description: 'Supply chain flow visualization',
        };
      case 'fake-news':
        return {
          animation: 'glitch',
          description: 'Digital forensics analysis',
        };
      case 'legal-evidence':
        return {
          animation: 'seal',
          description: 'Cryptographic validation',
        };
      case 'online-marketplaces':
        return {
          animation: 'scan',
          description: 'Product authenticity check',
        };
      default:
        return {
          animation: 'default',
          description: 'Processing',
        };
    }
  };

  const getResultIcon = () => {
    switch (verificationStatus) {
      case 'authentic':
        return <CheckCircle2 className="w-16 h-16" style={{ color: '#39FF14' }} />;
      case 'partial':
        return <AlertTriangle className="w-16 h-16" style={{ color: '#FFD700' }} />;
      case 'tampered':
        return <XCircle className="w-16 h-16" style={{ color: '#FF1744' }} />;
      default:
        return null;
    }
  };

  const getResultAnimation = () => {
    switch (verificationStatus) {
      case 'authentic':
        return {
          initial: { scale: 0, rotate: -180 },
          animate: { scale: 1, rotate: 0 },
          transition: { type: 'spring', stiffness: 200, damping: 15 },
        };
      case 'partial':
        return {
          initial: { scale: 0 },
          animate: { scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] },
          transition: { duration: 0.6 },
        };
      case 'tampered':
        return {
          initial: { scale: 1, x: 0 },
          animate: {
            scale: [1, 1.2, 1],
            x: [0, -5, 5, -5, 5, 0],
          },
          transition: { duration: 0.5 },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className="min-h-screen relative bg-[#050508] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Layered Domain-Specific Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Ambient Moving Glows */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 30%, ${color} 0%, transparent 50%), 
                         radial-gradient(circle at 80% 70%, ${color} 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Domain-Specific Textures */}
        {domainKey === 'fake-news' && (
          <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%">
              <filter id="scanlines">
                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.5" numOctaves="2" />
                <feDisplacementMap in="SourceGraphic" scale="10" />
              </filter>
              <rect width="100%" height="100%" filter="url(#scanlines)" />
            </svg>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        )}

        {domainKey === 'food-delivery' && (
          <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%">
              {[...Array(6)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M -100 ${100 + i * 150} Q ${400 + i * 100} ${50 + i * 50} 1200 ${200 + i * 150}`}
                  stroke={color}
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 10, repeat: Infinity, delay: i * 1.5 }}
                />
              ))}
            </svg>
          </div>
        )}

        {domainKey === 'online-marketplaces' && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full blur-[1px]"
                style={{
                  backgroundColor: color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 0.4, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>
        )}

        {/* Core Vignette & Parallax Depth */}
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-transparent to-[#050508] opacity-70" />
      </div>

      {/* Legacy background removal */}

      {/* Top Navigation */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                <img src={logo} alt="PixelTrust Logo" className="w-full h-full object-contain p-1.5" />
                <div className="absolute inset-0 bg-white/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </motion.button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>Home</span>
            <span>/</span>
            <span style={{ color }}>{title}</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Animated Title with Typing Effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 font-mono"
            style={{ color }}
          >
            {displayedText}
            <span
              className="inline-block w-1 h-12 ml-1 align-middle"
              style={{
                backgroundColor: color,
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.1s',
              }}
            />
          </h1>
          <p className="text-2xl text-white/70">{tagline}</p>
          <p className="text-white/50 mt-4 max-w-2xl">{description}</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Breathing glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{
                background: `radial-gradient(circle, ${color}30, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Upload Area */}
            <div
              className={`relative bg-white/5 backdrop-blur-xl border-2 rounded-2xl p-12 text-center transition-all duration-300 ${isDragging ? 'border-opacity-100 scale-[1.02]' : 'border-white/10'}`}
              style={{
                borderColor: isDragging ? color : undefined,
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />

              {!uploadedFile ? (
                <div className="space-y-4">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                    style={{
                      background: `${color}20`,
                    }}
                    animate={{
                      scale: isDragging ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isDragging ? Infinity : 0,
                    }}
                  >
                    <Upload className="w-10 h-10" style={{ color }} />
                  </motion.div>

                  <div>
                    <p className="text-xl text-white mb-2">
                      Drag & Drop your file here
                    </p>
                    <p className="text-white/50 text-sm mb-4">
                      or click to browse
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{
                        background: `${color}20`,
                        color: color,
                        border: `1px solid ${color}40`,
                      }}
                    >
                      Select File
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <CheckCircle2
                    className="w-16 h-16 mx-auto"
                    style={{ color }}
                  />
                  <p className="text-xl text-white">{uploadedFile.name}</p>
                  <p className="text-white/50 text-sm">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setVerificationStatus('idle');
                      setForensicResult(null);
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Verify Button */}
        {uploadedFile && verificationStatus === 'idle' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={handleVerify}
              className="relative px-12 py-4 rounded-xl font-bold text-lg text-white overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                }}
              />
              <motion.div
                className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                }}
              />
              <span className="relative z-10">Verify Now</span>
            </motion.button>
          </motion.div>
        )}

        {/* Verification Status */}
        <AnimatePresence mode="wait">
          {verificationStatus === 'verifying' && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-16 h-16 mx-auto" style={{ color }} />
              </motion.div>
              <p className="text-xl text-white mt-6">
                Analyzing pixels and spectral data...
              </p>
              <motion.div
                className="text-sm text-white/50 mt-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                PixelTrust Intelligence Engine active
              </motion.div>
            </motion.div>
          )}

          {verificationStatus !== 'idle' && verificationStatus !== 'verifying' && forensicResult && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Main Result Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl overflow-hidden relative">
                {/* Result Animation */}
                <motion.div
                  className="absolute top-0 right-0 p-8 opacity-20"
                  {...getResultAnimation()}
                >
                  {getResultIcon()}
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                  {/* Trust Ring */}
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={getResultColor()}
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 88}
                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - forensicResult.score / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold font-mono" style={{ color: getResultColor() }}>
                        {forensicResult.score}%
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Authenticity</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ background: `${getResultColor()}20`, color: getResultColor(), border: `1px solid ${getResultColor()}40` }}
                      >
                        {forensicResult.risk_level}
                      </span>
                      <span className="text-white/40 text-xs font-mono">ID: PT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">{forensicResult.verdict}</h2>
                    <p className="text-white/60 text-lg leading-relaxed">{forensicResult.domain_insight}</p>
                  </div>
                </div>
              </div>

              {/* Forensic Signals Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-white/60" />
                    <span>Detection Signals</span>
                  </h3>
                  <div className="space-y-4">
                    {forensicResult.signals.map((signal, idx) => (
                      <motion.div
                        key={idx}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white/90">{signal.name}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${signal.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                              signal.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : `${color}20`
                              }`}
                            style={signal.severity === 'Low' ? { backgroundColor: `${color}20`, color: color } : {}}
                          >
                            {signal.severity}
                          </span>
                        </div>
                        <p className="text-sm text-white/40">{signal.description}</p>
                      </motion.div>
                    ))}
                    {forensicResult.signals.length === 0 && (
                      <p className="text-white/40 italic">No significant anomalies detected.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                    <span>Integrity Report</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Pixel Consistency", status: forensicResult.score > 70 ? "Stable" : "Compromised" },
                      { label: "Metadata Integrity", status: forensicResult.signals.some(s => s.name.includes("Metadata")) ? "Inconsistent" : "Verified" },
                      { label: "Geospatial Alignment", status: "Verified" },
                      { label: "Neural Signature", status: forensicResult.score < 50 ? "AI Detected" : "Human" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <span className="text-white/60">{item.label}</span>
                        <span className="font-mono text-sm uppercase" style={{ color: item.status === 'Verified' || item.status === 'Stable' || item.status === 'Human' ? color : '#FF1744' }}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setVerificationStatus('idle');
                        setForensicResult(null);
                      }}
                      className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold group flex items-center justify-center space-x-2"
                    >
                      <span>Verify New Asset</span>
                      <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Domain-specific animated elements */}
        {domainKey === 'food-delivery' && verificationStatus === 'verifying' && (
          <div className="relative h-32 my-8">
            <svg className="w-full h-full">
              {[...Array(3)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={`${30 + i * 30}%`}
                  cy="50%"
                  r="8"
                  fill={color}
                  opacity="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
              <motion.path
                d="M30% 50% L60% 50% L90% 50%"
                stroke={color}
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </svg>
          </div>
        )}
      </main>
    </motion.div>
  );
}
