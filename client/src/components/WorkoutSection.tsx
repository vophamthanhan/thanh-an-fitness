// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Workout section with weekly plan, exercise details, and cardio
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getWeekWorkouts } from '@/lib/fitnessData';
import { Dumbbell, Timer, Flame, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKOUT_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416164558/VpCHskgJNkB6UZuHWsQZYc/workout-card-TNXKrb4sWgJFnPrQH68A2h.webp';

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  push: { bg: 'bg-lime/10', text: 'text-lime', border: 'border-lime/30' },
  pull: { bg: 'bg-amber-accent/10', text: 'text-amber-accent', border: 'border-amber-accent/30' },
  legs: { bg: 'bg-chart-5/10', text: 'text-chart-5', border: 'border-chart-5/30' },
  rest: { bg: 'bg-muted/50', text: 'text-muted-foreground', border: 'border-border/50' },
};

const TECHNIQUE_COLORS: Record<string, string> = {
  SUPERSET: 'bg-amber-accent/20 text-amber-accent border-amber-accent/30',
  DROPSET: 'bg-rose-accent/20 text-rose-accent border-rose-accent/30',
  'FST-7': 'bg-lime/20 text-lime border-lime/30',
  CIRCUIT: 'bg-chart-5/20 text-chart-5 border-chart-5/30',
};

export default function WorkoutSection() {
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const weekNum = parseInt(selectedWeek);
  const workouts = getWeekWorkouts(weekNum);

  return (
    <div className="space-y-6">
      {/* Header with image */}
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src={WORKOUT_IMG} alt="Workout" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Lịch Tập Luyện
            </h2>
            <p className="text-muted-foreground mt-1">Push/Pull/Legs × 2 + Cardio hàng ngày</p>
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <Tabs value={selectedWeek} onValueChange={setSelectedWeek}>
        <TabsList className="bg-secondary/50 p-1 rounded-xl">
          {[1, 2, 3, 4].map(w => (
            <TabsTrigger
              key={w}
              value={String(w)}
              className="data-[state=active]:bg-lime data-[state=active]:text-lime-foreground rounded-lg px-6"
            >
              Tuần {w}
            </TabsTrigger>
          ))}
        </TabsList>

        {[1, 2, 3, 4].map(w => (
          <TabsContent key={w} value={String(w)} className="mt-6">
            <div className="mb-4">
              <Badge variant="outline" className={`${weekNum <= 2 ? 'border-lime/50 text-lime' : 'border-amber-accent/50 text-amber-accent'}`}>
                {weekNum <= 2 ? 'Giai đoạn Thích Nghi (60-70% 1RM)' : 'Giai đoạn Tăng Cường (70-80% 1RM)'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                {weekNum <= 2
                  ? 'Tập trung form, kích hoạt cơ, tránh chấn thương. Rest 60-90 giây.'
                  : 'Tăng cường độ với Superset, Dropset, FST-7. Rest 45-60 giây.'}
              </p>
            </div>

            <div className="space-y-3">
              {workouts.map((workout, idx) => {
                const colors = TYPE_COLORS[workout.type];
                const isExpanded = expandedDay === idx;

                return (
                  <motion.div key={idx} layout>
                    <Card
                      className={`bg-card border-border/50 hover:border-lime/20 transition-all cursor-pointer ${isExpanded ? 'glow-lime-sm' : ''}`}
                      onClick={() => setExpandedDay(isExpanded ? null : idx)}
                    >
                      <CardContent className="p-0">
                        {/* Day Header */}
                        <div className="flex items-center gap-4 p-4">
                          <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                            <span className={`stat-number text-sm ${colors.text}`}>{workout.dayLabel}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{workout.title}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              {workout.type !== 'rest' && (
                                <>
                                  <span className="flex items-center gap-1">
                                    <Dumbbell className="w-3 h-3" />
                                    {workout.exercises.length} bài
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Timer className="w-3 h-3" />
                                    {workout.cardioMinutes}p cardio
                                  </span>
                                </>
                              )}
                              <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                ~{workout.estimatedCalories} kcal
                              </span>
                            </div>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && workout.type !== 'rest' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 border-t border-border/30 pt-4">
                                {/* Exercises Table */}
                                <div className="space-y-2">
                                  {workout.exercises.map((ex, exIdx) => (
                                    <div
                                      key={exIdx}
                                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                    >
                                      <span className="stat-number text-xs text-muted-foreground w-6">{exIdx + 1}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-sm text-foreground font-medium">{ex.name}</span>
                                          {ex.technique && (
                                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${TECHNIQUE_COLORS[ex.technique] || ''}`}>
                                              {ex.technique}
                                            </Badge>
                                          )}
                                        </div>
                                        {ex.note && <span className="text-xs text-muted-foreground">{ex.note}</span>}
                                      </div>
                                      <div className="text-right flex-shrink-0">
                                        <span className="stat-number text-sm text-foreground">{ex.sets}×{ex.reps}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Cardio */}
                                <div className="mt-4 p-3 rounded-lg bg-lime/5 border border-lime/20">
                                  <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-lime" />
                                    <span className="text-sm font-medium text-lime">Cardio</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{workout.cardio}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {isExpanded && workout.type === 'rest' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 border-t border-border/30 pt-4">
                                <p className="text-sm text-muted-foreground">
                                  Ngày nghỉ ngơi tích cực. Đi bộ nhẹ 30-45 phút, stretching, foam rolling.
                                  Giữ chế độ ăn, uống đủ nước, ngủ đủ giấc.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
