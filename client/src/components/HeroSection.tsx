// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Hero section with dramatic banner and key stats
import { motion } from 'framer-motion';
import { ChevronDown, Flame, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROFILE } from '@/lib/fitnessData';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416164558/VpCHskgJNkB6UZuHWsQZYc/hero-banner-nmkLGJzyXNJaaGcnmnqNrz.webp';

export default function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Fitness hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              30 Ngày Thay Đổi
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-foreground">Kế Hoạch</span>
            <br />
            <span className="text-gradient-lime">Giảm 10kg</span>
            <br />
            <span className="text-foreground">Trong 30 Ngày</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 max-w-lg"
          >
            Chương trình tập luyện và dinh dưỡng được thiết kế riêng cho{' '}
            <span className="text-foreground font-semibold">{PROFILE.name}</span> — 
            kết hợp PPL Split, Superset, Dropset & FST-7 cùng chế độ ăn khoa học.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-8 max-w-md"
          >
            <div className="bg-glass rounded-xl p-4 border border-border/50">
              <Target className="w-5 h-5 text-lime mb-2" />
              <div className="stat-number text-2xl text-foreground">{PROFILE.startWeight}kg</div>
              <div className="text-xs text-muted-foreground mt-1">Hiện tại</div>
            </div>
            <div className="bg-glass rounded-xl p-4 border border-border/50">
              <Flame className="w-5 h-5 text-amber-accent mb-2" />
              <div className="stat-number text-2xl text-foreground">{PROFILE.targetWeight}kg</div>
              <div className="text-xs text-muted-foreground mt-1">Mục tiêu</div>
            </div>
            <div className="bg-glass rounded-xl p-4 border border-border/50">
              <Calendar className="w-5 h-5 text-chart-5 mb-2" />
              <div className="stat-number text-2xl text-foreground">{PROFILE.duration}</div>
              <div className="text-xs text-muted-foreground mt-1">Ngày</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-lime text-lime-foreground hover:bg-lime/90 font-semibold text-base px-8 py-6 rounded-xl glow-lime-sm"
            >
              Bắt Đầu Ngay
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
