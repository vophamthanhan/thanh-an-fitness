// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Tracking section with daily log form, weight chart, and data export
import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DayLog, saveDayLog, getAllLogs, getDayLog, exportLogsAsJSON, importLogsFromJSON, PROFILE } from '@/lib/fitnessData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Save, Download, Upload, CalendarDays, TrendingDown, Scale, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const MOTIVATION_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416164558/VpCHskgJNkB6UZuHWsQZYc/motivation-bg-oMhzPkxki4hS9ZPVkisqn9.webp';

const MOODS = [
  { value: 'great', label: 'Tuyệt vời', emoji: '🔥' },
  { value: 'good', label: 'Tốt', emoji: '💪' },
  { value: 'ok', label: 'Bình thường', emoji: '😐' },
  { value: 'tired', label: 'Mệt', emoji: '😓' },
  { value: 'exhausted', label: 'Kiệt sức', emoji: '😵' },
];

export default function TrackingSection() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [refreshKey, setRefreshKey] = useState(0);

  const existingLog = useMemo(() => getDayLog(selectedDate), [selectedDate, refreshKey]);

  const [formData, setFormData] = useState<Partial<DayLog>>({
    weight: existingLog?.weight || undefined,
    waist: existingLog?.waist || undefined,
    chest: existingLog?.chest || undefined,
    arm: existingLog?.arm || undefined,
    workoutCompleted: existingLog?.workoutCompleted || false,
    mealsFollowed: existingLog?.mealsFollowed || false,
    waterLiters: existingLog?.waterLiters || undefined,
    sleepHours: existingLog?.sleepHours || undefined,
    mood: existingLog?.mood || undefined,
    notes: existingLog?.notes || '',
    caloriesConsumed: existingLog?.caloriesConsumed || undefined,
  });

  // Update form when date changes
  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
    const log = getDayLog(date);
    setFormData({
      weight: log?.weight || undefined,
      waist: log?.waist || undefined,
      chest: log?.chest || undefined,
      arm: log?.arm || undefined,
      workoutCompleted: log?.workoutCompleted || false,
      mealsFollowed: log?.mealsFollowed || false,
      waterLiters: log?.waterLiters || undefined,
      sleepHours: log?.sleepHours || undefined,
      mood: log?.mood || undefined,
      notes: log?.notes || '',
      caloriesConsumed: log?.caloriesConsumed || undefined,
    });
  }, []);

  const handleSave = () => {
    const log: DayLog = {
      date: selectedDate,
      weight: formData.weight,
      waist: formData.waist,
      chest: formData.chest,
      arm: formData.arm,
      workoutCompleted: formData.workoutCompleted || false,
      mealsFollowed: formData.mealsFollowed || false,
      waterLiters: formData.waterLiters,
      sleepHours: formData.sleepHours,
      mood: formData.mood as DayLog['mood'],
      notes: formData.notes,
      caloriesConsumed: formData.caloriesConsumed,
    };
    saveDayLog(log);
    setRefreshKey(k => k + 1);
    toast.success('Đã lưu dữ liệu!', { description: `Ngày ${selectedDate}` });
  };

  const handleExport = () => {
    const json = exportLogsAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thanh-an-fitness-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Đã xuất dữ liệu!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = importLogsFromJSON(ev.target?.result as string);
          if (result) {
            setRefreshKey(k => k + 1);
            toast.success('Đã nhập dữ liệu!');
          } else {
            toast.error('Lỗi khi nhập dữ liệu');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const allLogs = useMemo(() => getAllLogs().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [refreshKey]);

  const weightChartData = useMemo(() => {
    return allLogs
      .filter(l => l.weight)
      .map(l => ({
        date: l.date.slice(5),
        weight: l.weight,
        target: PROFILE.targetWeight,
      }));
  }, [allLogs]);

  const measurementChartData = useMemo(() => {
    return allLogs
      .filter(l => l.waist || l.chest || l.arm)
      .map(l => ({
        date: l.date.slice(5),
        waist: l.waist,
        chest: l.chest,
        arm: l.arm,
      }));
  }, [allLogs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden h-40">
        <img src={MOTIVATION_IMG} alt="Motivation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Theo Dõi Tiến Trình
            </h2>
            <p className="text-muted-foreground mt-1">Ghi nhận hàng ngày để đạt mục tiêu</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" /> Xuất Dữ Liệu
        </Button>
        <Button variant="outline" onClick={handleImport} className="gap-2">
          <Upload className="w-4 h-4" /> Nhập Dữ Liệu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Log Form */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border/50 sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-lime" />
                Nhật Ký Ngày
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date picker */}
              <div>
                <Label className="text-xs text-muted-foreground">Ngày</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="bg-secondary/50 border-border/50 mt-1"
                />
              </div>

              {/* Weight */}
              <div>
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Scale className="w-3 h-3" /> Cân nặng (kg)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="VD: 99.5"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData(f => ({ ...f, weight: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  className="bg-secondary/50 border-border/50 mt-1 stat-number"
                />
              </div>

              {/* Measurements */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Vòng eo (cm)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="cm"
                    value={formData.waist || ''}
                    onChange={(e) => setFormData(f => ({ ...f, waist: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    className="bg-secondary/50 border-border/50 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Vòng ngực</Label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="cm"
                    value={formData.chest || ''}
                    onChange={(e) => setFormData(f => ({ ...f, chest: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    className="bg-secondary/50 border-border/50 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bắp tay</Label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="cm"
                    value={formData.arm || ''}
                    onChange={(e) => setFormData(f => ({ ...f, arm: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    className="bg-secondary/50 border-border/50 mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Calories consumed */}
              <div>
                <Label className="text-xs text-muted-foreground">Calo tiêu thụ (kcal)</Label>
                <Input
                  type="number"
                  placeholder="VD: 1600"
                  value={formData.caloriesConsumed || ''}
                  onChange={(e) => setFormData(f => ({ ...f, caloriesConsumed: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="bg-secondary/50 border-border/50 mt-1 stat-number"
                />
              </div>

              {/* Water & Sleep */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Nước (lít)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="VD: 3.5"
                    value={formData.waterLiters || ''}
                    onChange={(e) => setFormData(f => ({ ...f, waterLiters: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    className="bg-secondary/50 border-border/50 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Giấc ngủ (giờ)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="VD: 7.5"
                    value={formData.sleepHours || ''}
                    onChange={(e) => setFormData(f => ({ ...f, sleepHours: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    className="bg-secondary/50 border-border/50 mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Đã tập xong?</Label>
                  <Switch
                    checked={formData.workoutCompleted}
                    onCheckedChange={(v) => setFormData(f => ({ ...f, workoutCompleted: v }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Ăn đúng plan?</Label>
                  <Switch
                    checked={formData.mealsFollowed}
                    onCheckedChange={(v) => setFormData(f => ({ ...f, mealsFollowed: v }))}
                  />
                </div>
              </div>

              {/* Mood */}
              <div>
                <Label className="text-xs text-muted-foreground">Tâm trạng</Label>
                <Select value={formData.mood || ''} onValueChange={(v) => setFormData(f => ({ ...f, mood: v as DayLog['mood'] }))}>
                  <SelectTrigger className="bg-secondary/50 border-border/50 mt-1">
                    <SelectValue placeholder="Chọn tâm trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map(m => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.emoji} {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-xs text-muted-foreground">Ghi chú</Label>
                <Textarea
                  placeholder="Ghi chú thêm..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData(f => ({ ...f, notes: e.target.value }))}
                  className="bg-secondary/50 border-border/50 mt-1 min-h-[60px]"
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full bg-lime text-lime-foreground hover:bg-lime/90 font-semibold gap-2"
              >
                <Save className="w-4 h-4" />
                Lưu Ngày {selectedDate.slice(5)}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weight Progress */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-lime" />
                Biểu Đồ Cân Nặng
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weightChartData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weightChartData}>
                      <defs>
                        <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.78 0.2 130)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.78 0.2 130)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.03 260)" />
                      <XAxis dataKey="date" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'oklch(0.22 0.03 260)',
                          border: '1px solid oklch(0.32 0.03 260)',
                          borderRadius: '8px',
                          color: 'oklch(0.93 0.01 260)',
                        }}
                        formatter={(value: number, name: string) => [`${value} kg`, name === 'weight' ? 'Cân nặng' : 'Mục tiêu']}
                      />
                      <Area type="monotone" dataKey="weight" stroke="oklch(0.78 0.2 130)" strokeWidth={3} fill="url(#weightGradient)" dot={{ fill: 'oklch(0.78 0.2 130)', r: 4 }} />
                      <Line type="monotone" dataKey="target" stroke="oklch(0.65 0.2 15)" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Chưa có dữ liệu cân nặng</p>
                    <p className="text-sm mt-1">Hãy bắt đầu ghi nhận cân nặng hàng ngày!</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Body Measurements */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Ruler className="w-5 h-5 text-amber-accent" />
                Số Đo Cơ Thể
              </CardTitle>
            </CardHeader>
            <CardContent>
              {measurementChartData.length > 0 ? (
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={measurementChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.03 260)" />
                      <XAxis dataKey="date" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} />
                      <YAxis tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'oklch(0.22 0.03 260)',
                          border: '1px solid oklch(0.32 0.03 260)',
                          borderRadius: '8px',
                          color: 'oklch(0.93 0.01 260)',
                        }}
                        formatter={(value: number, name: string) => {
                          const labels: Record<string, string> = { waist: 'Vòng eo', chest: 'Vòng ngực', arm: 'Bắp tay' };
                          return [`${value} cm`, labels[name] || name];
                        }}
                      />
                      <Line type="monotone" dataKey="waist" stroke="oklch(0.8 0.18 80)" strokeWidth={2} dot={{ r: 3 }} name="waist" connectNulls />
                      <Line type="monotone" dataKey="chest" stroke="oklch(0.78 0.2 130)" strokeWidth={2} dot={{ r: 3 }} name="chest" connectNulls />
                      <Line type="monotone" dataKey="arm" stroke="oklch(0.7 0.15 200)" strokeWidth={2} dot={{ r: 3 }} name="arm" connectNulls />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Ruler className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Chưa có dữ liệu số đo</p>
                    <p className="text-sm mt-1">Đo vòng eo, ngực, bắp tay mỗi tuần!</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Log History */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Lịch Sử Ghi Nhận</CardTitle>
            </CardHeader>
            <CardContent>
              {allLogs.length > 0 ? (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {[...allLogs].reverse().map((log, i) => (
                    <motion.div
                      key={log.date}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleDateChange(log.date)}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium ${
                        log.workoutCompleted ? 'bg-lime/20 text-lime' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {log.date.slice(8)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{log.date}</span>
                          {log.workoutCompleted && <span className="text-xs text-lime">Đã tập</span>}
                          {log.mealsFollowed && <span className="text-xs text-amber-accent">Đúng plan</span>}
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                          {log.weight && <span>⚖️ {log.weight}kg</span>}
                          {log.waterLiters && <span>💧 {log.waterLiters}L</span>}
                          {log.sleepHours && <span>😴 {log.sleepHours}h</span>}
                          {log.mood && <span>{MOODS.find(m => m.value === log.mood)?.emoji}</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Chưa có dữ liệu nào</p>
                  <p className="text-sm mt-1">Bắt đầu ghi nhận từ hôm nay!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
