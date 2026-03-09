// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Dashboard with bento grid layout showing key metrics
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PROFILE, MACROS, WEEKLY_TARGETS, getAllLogs, getStreak } from '@/lib/fitnessData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Flame, Droplets, Moon, Dumbbell, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const MACRO_COLORS = ['oklch(0.78 0.2 130)', 'oklch(0.8 0.18 80)', 'oklch(0.65 0.15 260)'];

function ProgressRing({ value, max, size = 120, strokeWidth = 10, color = 'oklch(0.78 0.2 130)', label, sublabel }: {
  value: number; max: number; size?: number; strokeWidth?: number; color?: string; label: string; sublabel: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(0.28 0.025 260)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="stat-number text-xl text-foreground">{value}</span>
        <span className="text-[10px] text-muted-foreground">{sublabel}</span>
      </div>
      <span className="text-xs text-muted-foreground mt-2">{label}</span>
    </div>
  );
}

export default function DashboardSection() {
  const logs = useMemo(() => getAllLogs(), []);
  const streak = useMemo(() => getStreak(), []);
  const latestLog = logs.length > 0 ? logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null;
  const currentWeight = latestLog?.weight || PROFILE.startWeight;
  const weightLost = PROFILE.startWeight - currentWeight;
  const progressPercent = Math.round((weightLost / (PROFILE.startWeight - PROFILE.targetWeight)) * 100);
  const daysCompleted = logs.filter(l => l.workoutCompleted).length;

  const weightChartData = useMemo(() => {
    const targetData = WEEKLY_TARGETS.map(t => ({
      name: t.label.split(' - ')[0],
      target: t.weight,
      actual: undefined as number | undefined,
    }));

    // Add actual data from logs
    if (logs.length > 0) {
      const weightLogs = logs.filter(l => l.weight).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      weightLogs.forEach((log, i) => {
        if (i < targetData.length) {
          targetData[i].actual = log.weight;
        }
      });
    }

    return targetData;
  }, [logs]);

  const macroData = [
    { name: 'Protein', value: MACROS.protein.grams, unit: 'g' },
    { name: 'Carbs', value: MACROS.carbs.grams, unit: 'g' },
    { name: 'Fat', value: MACROS.fat.grams, unit: 'g' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    }),
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingDown, label: 'Đã giảm', value: `${weightLost.toFixed(1)}kg`, color: 'text-lime', bg: 'bg-lime/10' },
          { icon: Flame, label: 'Streak', value: `${streak} ngày`, color: 'text-amber-accent', bg: 'bg-amber-accent/10' },
          { icon: Dumbbell, label: 'Buổi tập', value: `${daysCompleted}/24`, color: 'text-chart-5', bg: 'bg-chart-5/10' },
          { icon: Trophy, label: 'Tiến độ', value: `${Math.max(0, progressPercent)}%`, color: 'text-lime', bg: 'bg-lime/10' },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="bg-card border-border/50 hover:border-lime/30 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="stat-number text-xl text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Progress Chart - Large */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants} className="lg:col-span-2">
          <Card className="bg-card border-border/50 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-lime" />
                Tiến Trình Cân Nặng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.03 260)" />
                    <XAxis dataKey="name" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 12 }} />
                    <YAxis domain={[88, 103]} tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.22 0.03 260)',
                        border: '1px solid oklch(0.32 0.03 260)',
                        borderRadius: '8px',
                        color: 'oklch(0.93 0.01 260)',
                      }}
                    />
                    <Line type="monotone" dataKey="target" stroke="oklch(0.78 0.2 130)" strokeWidth={2} strokeDasharray="8 4" dot={{ fill: 'oklch(0.78 0.2 130)', r: 4 }} name="Mục tiêu" />
                    <Line type="monotone" dataKey="actual" stroke="oklch(0.8 0.18 80)" strokeWidth={3} dot={{ fill: 'oklch(0.8 0.18 80)', r: 5 }} name="Thực tế" connectNulls={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Macro Distribution */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-card border-border/50 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Phân Bổ Macro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                      {macroData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={MACRO_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.22 0.03 260)',
                        border: '1px solid oklch(0.32 0.03 260)',
                        borderRadius: '8px',
                        color: 'oklch(0.93 0.01 260)',
                      }}
                      formatter={(value: number, name: string) => [`${value}g`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {macroData.map((m, i) => (
                  <div key={m.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MACRO_COLORS[i] }} />
                      <span className="text-muted-foreground">{m.name}</span>
                    </div>
                    <span className="stat-number text-foreground">{m.value}g</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground">Tổng calo mục tiêu</p>
                <p className="stat-number text-2xl text-lime">{MACROS.total} kcal</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Profile Info */}
      <motion.div custom={6} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Thông Tin Cá Nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Chiều cao', value: `${PROFILE.height}cm` },
                { label: 'Cân nặng', value: `${currentWeight}kg` },
                { label: 'BMI', value: PROFILE.bmi.toFixed(1) },
                { label: 'BMR', value: `${PROFILE.bmr} kcal` },
                { label: 'TDEE', value: `${PROFILE.tdee} kcal` },
                { label: 'Target', value: `${PROFILE.targetCalories} kcal` },
              ].map(item => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="stat-number text-lg text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Target */}
      <motion.div custom={7} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Mục Tiêu Theo Tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {WEEKLY_TARGETS.map((target, i) => {
                const isCompleted = currentWeight <= target.weight;
                return (
                  <div
                    key={i}
                    className={`flex-1 min-w-[140px] p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-lime/10 border-lime/30'
                        : 'bg-secondary/50 border-border/50'
                    }`}
                  >
                    <p className="text-xs text-muted-foreground">{target.label.split(' - ')[0]}</p>
                    <p className="stat-number text-xl text-foreground mt-1">{target.weight}kg</p>
                    {target.label.includes(' - ') && (
                      <p className="text-xs text-muted-foreground mt-1">{target.label.split(' - ')[1]}</p>
                    )}
                    {isCompleted && <span className="text-xs text-lime font-medium">Đạt!</span>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
