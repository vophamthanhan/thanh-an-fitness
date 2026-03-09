// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Nutrition section with daily meal plan, macro breakdown, and food database
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DAILY_MEALS, MACROS, FOOD_DATABASE, SUPPLEMENT_SCHEDULE } from '@/lib/fitnessData';
import { UtensilsCrossed, Clock, Pill, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const NUTRITION_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416164558/VpCHskgJNkB6UZuHWsQZYc/nutrition-card-j7YJP2MtS6fKMicAXJ4FXz.webp';

const MEAL_COLORS = ['oklch(0.78 0.2 130)', 'oklch(0.8 0.18 80)', 'oklch(0.65 0.15 260)', 'oklch(0.7 0.15 200)'];

export default function NutritionSection() {
  const [expandedMeal, setExpandedMeal] = useState<number | null>(0);

  const mealCalorieData = DAILY_MEALS.map((meal, i) => ({
    name: meal.name.replace('Bữa ', ''),
    calories: meal.totalCalories,
    protein: meal.totalProtein,
    fill: MEAL_COLORS[i],
  }));

  return (
    <div className="space-y-6">
      {/* Header with image */}
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src={NUTRITION_IMG} alt="Nutrition" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Chế Độ Dinh Dưỡng
            </h2>
            <p className="text-muted-foreground mt-1">~{MACROS.total} kcal/ngày | High Protein, Low Fat</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal Plan - Left 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-lime" />
            Lịch Ăn Hàng Ngày
          </h3>

          {DAILY_MEALS.map((meal, idx) => {
            const isExpanded = expandedMeal === idx;
            return (
              <Card
                key={idx}
                className="bg-card border-border/50 hover:border-lime/20 transition-all cursor-pointer"
                onClick={() => setExpandedMeal(isExpanded ? null : idx)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${MEAL_COLORS[idx]}20` }}
                    >
                      <Clock className="w-5 h-5" style={{ color: MEAL_COLORS[idx] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{meal.name}</h4>
                        <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="stat-number" style={{ color: MEAL_COLORS[idx] }}>{meal.totalCalories} kcal</span>
                        <span>P: {meal.totalProtein.toFixed(0)}g</span>
                        <span>C: {meal.totalCarbs.toFixed(0)}g</span>
                        <span>F: {meal.totalFat.toFixed(0)}g</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-border/30 pt-3">
                          <div className="space-y-2">
                            {meal.foods.map((food, fIdx) => (
                              <div key={fIdx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                                <div>
                                  <span className="text-sm text-foreground">{food.item}</span>
                                  <span className="text-xs text-muted-foreground ml-2">({food.amount})</span>
                                </div>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                  <span className="stat-number text-foreground">{food.calories}</span>
                                  <span>P:{food.protein}g</span>
                                  <span>C:{food.carbs}g</span>
                                  <span>F:{food.fat}g</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            );
          })}

          {/* Daily Total */}
          <Card className="bg-lime/5 border-lime/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng Calo Hàng Ngày</p>
                  <p className="stat-number text-3xl text-lime">{MACROS.total} kcal</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="stat-number text-xl text-foreground">{MACROS.protein.grams}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="stat-number text-xl text-foreground">{MACROS.carbs.grams}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="stat-number text-xl text-foreground">{MACROS.fat.grams}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Calories per meal chart */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Calo Theo Bữa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mealCalorieData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.03 260)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.22 0.03 260)',
                        border: '1px solid oklch(0.32 0.03 260)',
                        borderRadius: '8px',
                        color: 'oklch(0.93 0.01 260)',
                      }}
                      formatter={(value: number) => [`${value} kcal`]}
                    />
                    <Bar dataKey="calories" radius={[0, 6, 6, 0]}>
                      {mealCalorieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Supplements */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Pill className="w-4 h-4 text-lime" />
                Thực Phẩm Bổ Sung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SUPPLEMENT_SCHEDULE.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-lime font-medium mb-1">{s.time}</p>
                  {s.items.map((item, j) => (
                    <p key={j} className="text-sm text-foreground">{item}</p>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Food Database */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Bảng Calo Thực Phẩm</CardTitle>
              <p className="text-xs text-muted-foreground">Per 100g (trừ Whey, Creatine & Trứng)</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {FOOD_DATABASE.map((food, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{food.icon}</span>
                    <span className="text-sm text-foreground">{food.name}</span>
                  </div>
                  <span className="stat-number text-sm text-muted-foreground">{food.caloriesPer100g} kcal</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
