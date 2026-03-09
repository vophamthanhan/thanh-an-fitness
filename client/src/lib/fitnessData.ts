// ============================================================
// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// All fitness plan data for Thành An's 30-day weight loss journey
// ============================================================

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  technique?: string;
  note?: string;
  restSeconds?: number;
}

export interface WorkoutDay {
  day: string;
  dayLabel: string;
  type: 'push' | 'pull' | 'legs' | 'rest';
  title: string;
  phase: string;
  exercises: Exercise[];
  cardio: string;
  cardioMinutes: number;
  estimatedCalories: number;
}

export interface Meal {
  name: string;
  time: string;
  foods: { item: string; amount: string; calories: number; protein: number; carbs: number; fat: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface DayLog {
  date: string;
  weight?: number;
  waist?: number;
  chest?: number;
  arm?: number;
  workoutCompleted: boolean;
  mealsFollowed: boolean;
  waterLiters?: number;
  sleepHours?: number;
  mood?: 'great' | 'good' | 'ok' | 'tired' | 'exhausted';
  notes?: string;
  caloriesConsumed?: number;
}

export const PROFILE = {
  name: 'Thành An',
  height: 168,
  startWeight: 101,
  targetWeight: 91,
  bmi: 35.8,
  bmr: 1915,
  tdee: 3303,
  targetCalories: 1584,
  duration: 30,
  experience: '4 năm (2019-2023)',
  techniques: ['Dropset', 'Superset', 'FST-7'],
  supplements: ['Whey Protein Isolate', 'Creatine'],
  schedule: '8:00 - 17:30',
};

export const MACROS = {
  protein: { grams: 199, calories: 796, percentage: 50 },
  carbs: { grams: 128, calories: 512, percentage: 32 },
  fat: { grams: 30, calories: 266, percentage: 17 },
  total: 1584,
};

export const FOOD_DATABASE = [
  { name: 'Ức gà (nấu)', caloriesPer100g: 165, protein: 31, carbs: 0, fat: 3.6, icon: '🍗' },
  { name: 'Khoai lang (luộc)', caloriesPer100g: 86, protein: 1.6, carbs: 20, fat: 0.1, icon: '🍠' },
  { name: 'Hạt chia', caloriesPer100g: 486, protein: 17, carbs: 42, fat: 31, icon: '🌰' },
  { name: 'Dưa leo', caloriesPer100g: 15, protein: 0.7, carbs: 3.6, fat: 0.1, icon: '🥒' },
  { name: 'Ổi', caloriesPer100g: 68, protein: 2.6, carbs: 14, fat: 1, icon: '🍈' },
  { name: 'Trứng luộc (1 quả)', caloriesPer100g: 155, protein: 13, carbs: 1.1, fat: 11, icon: '🥚' },
  { name: 'Lòng trắng trứng', caloriesPer100g: 52, protein: 11, carbs: 0.7, fat: 0.2, icon: '🍳' },
  { name: 'Cà chua', caloriesPer100g: 18, protein: 0.9, carbs: 3.9, fat: 0.2, icon: '🍅' },
  { name: 'Whey Isolate (1 scoop)', caloriesPer100g: 400, protein: 83, carbs: 6.7, fat: 1.7, icon: '🥤' },
  { name: 'Creatine (5g)', caloriesPer100g: 0, protein: 0, carbs: 0, fat: 0, icon: '💊' },
];

export const DAILY_MEALS: Meal[] = [
  {
    name: 'Bữa Sáng',
    time: '6:00 - 6:30',
    foods: [
      { item: 'Trứng luộc nguyên quả', amount: '1 quả (50g)', calories: 78, protein: 6.5, carbs: 0.6, fat: 5.5 },
      { item: 'Lòng trắng trứng', amount: '3 quả (~100g)', calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
      { item: 'Khoai lang luộc', amount: '150g', calories: 129, protein: 2.4, carbs: 30, fat: 0.2 },
      { item: 'Hạt chia ngâm', amount: '15g', calories: 73, protein: 2.5, carbs: 6.3, fat: 4.7 },
      { item: 'Ổi', amount: '1 quả (100g)', calories: 68, protein: 2.6, carbs: 14, fat: 1 },
    ],
    totalCalories: 400,
    totalProtein: 25,
    totalCarbs: 51.6,
    totalFat: 11.6,
  },
  {
    name: 'Bữa Trưa',
    time: '12:00 - 12:30',
    foods: [
      { item: 'Ức gà nấu', amount: '200g', calories: 330, protein: 62, carbs: 0, fat: 7.2 },
      { item: 'Khoai lang luộc', amount: '150g', calories: 129, protein: 2.4, carbs: 30, fat: 0.2 },
      { item: 'Dưa leo', amount: '150g', calories: 22, protein: 1.1, carbs: 5.4, fat: 0.2 },
      { item: 'Cà chua', amount: '100g', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    ],
    totalCalories: 499,
    totalProtein: 66.4,
    totalCarbs: 39.3,
    totalFat: 7.8,
  },
  {
    name: 'Bữa Chiều (Pre-workout)',
    time: '16:00',
    foods: [
      { item: 'Ức gà', amount: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { item: 'Dưa leo', amount: '100g', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
      { item: 'Cà chua', amount: '100g', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
      { item: 'Creatine', amount: '5g', calories: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    totalCalories: 198,
    totalProtein: 32.6,
    totalCarbs: 7.5,
    totalFat: 3.9,
  },
  {
    name: 'Bữa Tối (Post-workout)',
    time: '19:00 - 19:30',
    foods: [
      { item: 'Whey Protein Isolate', amount: '1 scoop (30g)', calories: 120, protein: 25, carbs: 2, fat: 0.5 },
      { item: 'Ức gà', amount: '150g', calories: 248, protein: 46.5, carbs: 0, fat: 5.4 },
      { item: 'Khoai lang', amount: '100g', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { item: 'Dưa leo', amount: '100g', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
      { item: 'Cà chua', amount: '100g', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    ],
    totalCalories: 487,
    totalProtein: 74.7,
    totalCarbs: 29.5,
    totalFat: 6.3,
  },
];

// Week 1-2: Re-adaptation Phase
const PUSH_A_W12: Exercise[] = [
  { name: 'Bench Press', sets: '4', reps: '12', note: '60-70% 1RM', restSeconds: 90 },
  { name: 'Incline Dumbbell Press', sets: '3', reps: '12', restSeconds: 75 },
  { name: 'Cable Flyes', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Overhead Press', sets: '4', reps: '12', restSeconds: 90 },
  { name: 'Lateral Raises', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Tricep Pushdown', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Overhead Tricep Extension', sets: '3', reps: '12', restSeconds: 60 },
];

const PULL_A_W12: Exercise[] = [
  { name: 'Lat Pulldown', sets: '4', reps: '12', restSeconds: 75 },
  { name: 'Seated Cable Row', sets: '4', reps: '12', restSeconds: 75 },
  { name: 'Dumbbell Row', sets: '3', reps: '12/tay', restSeconds: 75 },
  { name: 'Face Pulls', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Barbell Curl', sets: '3', reps: '12', restSeconds: 60 },
  { name: 'Hammer Curl', sets: '3', reps: '12', restSeconds: 60 },
];

const LEGS_A_W12: Exercise[] = [
  { name: 'Leg Press', sets: '4', reps: '15', restSeconds: 90 },
  { name: 'Goblet Squat', sets: '3', reps: '12', restSeconds: 75 },
  { name: 'Romanian Deadlift', sets: '4', reps: '12', restSeconds: 90 },
  { name: 'Leg Curl', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Leg Extension', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Calf Raises', sets: '4', reps: '15', restSeconds: 60 },
];

const PUSH_B_W12: Exercise[] = [
  { name: 'Dumbbell Bench Press', sets: '4', reps: '12', restSeconds: 90 },
  { name: 'Machine Chest Press', sets: '3', reps: '12', restSeconds: 75 },
  { name: 'Pec Deck', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Arnold Press', sets: '4', reps: '12', restSeconds: 90 },
  { name: 'Front Raises', sets: '3', reps: '12', restSeconds: 60 },
  { name: 'Dips (Assisted)', sets: '3', reps: '10-12', restSeconds: 75 },
  { name: 'Skull Crushers', sets: '3', reps: '12', restSeconds: 60 },
];

const PULL_B_W12: Exercise[] = [
  { name: 'Deadlift', sets: '4', reps: '10', restSeconds: 120 },
  { name: 'Pull-ups (Assisted)', sets: '3', reps: '8-10', restSeconds: 90 },
  { name: 'T-Bar Row', sets: '4', reps: '12', restSeconds: 75 },
  { name: 'Cable Pullover', sets: '3', reps: '12', restSeconds: 60 },
  { name: 'Reverse Flyes', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Preacher Curl', sets: '3', reps: '12', restSeconds: 60 },
  { name: 'Cable Curl', sets: '3', reps: '12', restSeconds: 60 },
];

const LEGS_B_W12: Exercise[] = [
  { name: 'Barbell Squat', sets: '4', reps: '12', restSeconds: 90 },
  { name: 'Walking Lunges', sets: '3', reps: '12/chân', restSeconds: 75 },
  { name: 'Leg Press (Narrow)', sets: '3', reps: '15', restSeconds: 75 },
  { name: 'Seated Leg Curl', sets: '3', reps: '15', restSeconds: 60 },
  { name: 'Hip Thrust', sets: '4', reps: '12', restSeconds: 75 },
  { name: 'Plank', sets: '3', reps: '45 giây', restSeconds: 45 },
  { name: 'Cable Crunch', sets: '3', reps: '15', restSeconds: 45 },
  { name: 'Russian Twist', sets: '3', reps: '20', restSeconds: 45 },
];

// Week 3-4: Intensification Phase
const PUSH_A_W34: Exercise[] = [
  { name: 'Bench Press', sets: '4', reps: '10', note: '70-80% 1RM', restSeconds: 90 },
  { name: 'Incline DB Press + Cable Flyes', sets: '4', reps: '10+12', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'OHP + Lateral Raises', sets: '4', reps: '10+15', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Tricep Pushdown', sets: '3', reps: '12/10/8', technique: 'DROPSET', restSeconds: 0 },
  { name: 'Cable Lateral Raises', sets: '7', reps: '12', technique: 'FST-7', restSeconds: 30 },
];

const PULL_A_W34: Exercise[] = [
  { name: 'Barbell Row', sets: '4', reps: '10', restSeconds: 90 },
  { name: 'Lat Pulldown + Straight Arm Pulldown', sets: '4', reps: '10+12', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Seated Row + Face Pulls', sets: '4', reps: '10+15', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Barbell Curl', sets: '3', reps: '10/8/6', technique: 'DROPSET', restSeconds: 0 },
  { name: 'Cable Curl', sets: '7', reps: '12', technique: 'FST-7', restSeconds: 30 },
];

const LEGS_A_W34: Exercise[] = [
  { name: 'Barbell Squat', sets: '5', reps: '8', restSeconds: 120 },
  { name: 'Leg Press + Jump Squats', sets: '4', reps: '10+10', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Romanian Deadlift', sets: '4', reps: '10', restSeconds: 90 },
  { name: 'Leg Curl + Leg Extension', sets: '4', reps: '12+12', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Calf Raises', sets: '3', reps: '15/12/10', technique: 'DROPSET', restSeconds: 0 },
  { name: 'Leg Extension', sets: '7', reps: '12', technique: 'FST-7', restSeconds: 30 },
];

const PUSH_B_W34: Exercise[] = [
  { name: 'Incline Barbell Press', sets: '4', reps: '10', restSeconds: 90 },
  { name: 'Flat DB Press + Push-ups', sets: '4', reps: '10+max', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Arnold Press + Rear Delt Flyes', sets: '4', reps: '10+15', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Dips', sets: '3', reps: 'max/max-2/max-4', technique: 'DROPSET', restSeconds: 0 },
  { name: 'Tricep Pushdown', sets: '7', reps: '12', technique: 'FST-7', restSeconds: 30 },
];

const PULL_B_W34: Exercise[] = [
  { name: 'Deadlift', sets: '5', reps: '6-8', restSeconds: 150 },
  { name: 'Weighted Pull-ups + DB Row', sets: '4', reps: '8+10', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Cable Row + Reverse Flyes', sets: '4', reps: '10+15', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Preacher Curl', sets: '3', reps: '10/8/6', technique: 'DROPSET', restSeconds: 0 },
  { name: 'Hammer Curl', sets: '7', reps: '12', technique: 'FST-7', restSeconds: 30 },
];

const LEGS_B_W34: Exercise[] = [
  { name: 'Front Squat', sets: '4', reps: '10', restSeconds: 90 },
  { name: 'Walking Lunges + Box Jumps', sets: '4', reps: '12+10', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Hip Thrust + Glute Bridge', sets: '4', reps: '12+15', technique: 'SUPERSET', restSeconds: 60 },
  { name: 'Leg Curl', sets: '4', reps: '12', restSeconds: 60 },
  { name: 'Plank', sets: '3', reps: '60 giây', technique: 'CIRCUIT', restSeconds: 30 },
  { name: 'Mountain Climbers', sets: '3', reps: '20', technique: 'CIRCUIT', restSeconds: 30 },
  { name: 'Bicycle Crunch', sets: '3', reps: '20', technique: 'CIRCUIT', restSeconds: 30 },
  { name: 'Leg Raises', sets: '3', reps: '15', technique: 'CIRCUIT', restSeconds: 30 },
];

export function getWeekWorkouts(week: number): WorkoutDay[] {
  const isPhase1 = week <= 2;
  const phase = isPhase1 ? 'Tuần 1-2: Thích Nghi' : 'Tuần 3-4: Tăng Cường';

  return [
    {
      day: 'Thứ 2',
      dayLabel: 'T2',
      type: 'push',
      title: 'Push A - Ngực, Vai, Tay Sau',
      phase,
      exercises: isPhase1 ? PUSH_A_W12 : PUSH_A_W34,
      cardio: isPhase1 ? '20 phút đi bộ nhanh (incline 10-12%)' : '20 phút HIIT máy chạy',
      cardioMinutes: 20,
      estimatedCalories: isPhase1 ? 350 : 450,
    },
    {
      day: 'Thứ 3',
      dayLabel: 'T3',
      type: 'pull',
      title: 'Pull A - Lưng, Tay Trước',
      phase,
      exercises: isPhase1 ? PULL_A_W12 : PULL_A_W34,
      cardio: isPhase1 ? '25 phút HIIT xe đạp (30s sprint / 60s rest)' : '25 phút HIIT xe đạp',
      cardioMinutes: 25,
      estimatedCalories: isPhase1 ? 380 : 480,
    },
    {
      day: 'Thứ 4',
      dayLabel: 'T4',
      type: 'legs',
      title: 'Legs A - Chân, Mông',
      phase,
      exercises: isPhase1 ? LEGS_A_W12 : LEGS_A_W34,
      cardio: isPhase1 ? '15 phút đi bộ nhanh' : '15 phút LISS',
      cardioMinutes: 15,
      estimatedCalories: isPhase1 ? 400 : 520,
    },
    {
      day: 'Thứ 5',
      dayLabel: 'T5',
      type: 'push',
      title: 'Push B - Ngực, Vai, Tay Sau',
      phase,
      exercises: isPhase1 ? PUSH_B_W12 : PUSH_B_W34,
      cardio: isPhase1 ? '25 phút HIIT máy chạy (1p chạy / 1p đi)' : '25 phút HIIT',
      cardioMinutes: 25,
      estimatedCalories: isPhase1 ? 370 : 460,
    },
    {
      day: 'Thứ 6',
      dayLabel: 'T6',
      type: 'pull',
      title: 'Pull B - Lưng, Tay Trước',
      phase,
      exercises: isPhase1 ? PULL_B_W12 : PULL_B_W34,
      cardio: isPhase1 ? '20 phút đi bộ incline' : '20 phút LISS',
      cardioMinutes: 20,
      estimatedCalories: isPhase1 ? 380 : 470,
    },
    {
      day: 'Thứ 7',
      dayLabel: 'T7',
      type: 'legs',
      title: isPhase1 ? 'Legs B + Core' : 'Legs B + Core (Metabolic)',
      phase,
      exercises: isPhase1 ? LEGS_B_W12 : LEGS_B_W34,
      cardio: '30 phút đi bộ nhanh',
      cardioMinutes: 30,
      estimatedCalories: isPhase1 ? 420 : 550,
    },
    {
      day: 'Chủ nhật',
      dayLabel: 'CN',
      type: 'rest',
      title: 'Nghỉ ngơi / Active Recovery',
      phase,
      exercises: [],
      cardio: '30-45 phút đi bộ nhẹ',
      cardioMinutes: 35,
      estimatedCalories: 200,
    },
  ];
}

export const WEEKLY_TARGETS = [
  { week: 0, weight: 101, label: 'Bắt đầu' },
  { week: 1, weight: 98.5, label: 'Tuần 1 - Mất nước + glycogen' },
  { week: 2, weight: 96.5, label: 'Tuần 2 - Đốt mỡ thực sự' },
  { week: 3, weight: 94, label: 'Tuần 3 - Tăng cường độ' },
  { week: 4, weight: 91, label: 'Tuần 4 - Mục tiêu cuối' },
];

export const TIPS = [
  { icon: '💧', title: 'Nước', content: 'Uống tối thiểu 3-4 lít nước/ngày. Thêm 2-3 ly trà xanh không đường.' },
  { icon: '😴', title: 'Giấc ngủ', content: 'Ngủ đủ 7-8 tiếng/đêm. Giấc ngủ ảnh hưởng trực tiếp đến recovery và giảm cân.' },
  { icon: '⚖️', title: 'Cân nặng', content: 'Cân vào buổi sáng, sau khi đi vệ sinh, trước khi ăn. Ghi nhận mỗi ngày.' },
  { icon: '📏', title: 'Số đo', content: 'Đo vòng eo, vòng ngực, vòng bắp tay mỗi tuần vào cùng thời điểm.' },
  { icon: '📸', title: 'Progress Photo', content: 'Chụp ảnh tiến trình mỗi tuần, cùng góc, cùng ánh sáng.' },
  { icon: '⚠️', title: 'Lưu ý', content: 'Nếu cảm thấy quá mệt, chóng mặt: tăng calo lên 1,800-2,000 kcal.' },
];

export const SUPPLEMENT_SCHEDULE = [
  { time: 'Trước tập (16:00)', items: ['5g Creatine + nước'] },
  { time: 'Sau tập (19:00)', items: ['1 scoop Whey Protein Isolate + nước'] },
];

// LocalStorage helpers
const STORAGE_KEY = 'thanh-an-fitness-logs';

export function saveDayLog(log: DayLog): void {
  const logs = getAllLogs();
  const existingIndex = logs.findIndex(l => l.date === log.date);
  if (existingIndex >= 0) {
    logs[existingIndex] = log;
  } else {
    logs.push(log);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getAllLogs(): DayLog[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getDayLog(date: string): DayLog | undefined {
  const logs = getAllLogs();
  return logs.find(l => l.date === date);
}

export function getStreak(): number {
  const logs = getAllLogs().filter(l => l.workoutCompleted);
  if (logs.length === 0) return 0;
  
  logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    const dayOfWeek = checkDate.getDay();
    
    // Skip Sundays (rest day)
    if (dayOfWeek === 0) continue;
    
    const log = logs.find(l => l.date === dateStr);
    if (log?.workoutCompleted) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

export function exportLogsAsJSON(): string {
  return JSON.stringify(getAllLogs(), null, 2);
}

export function importLogsFromJSON(json: string): boolean {
  try {
    const logs = JSON.parse(json) as DayLog[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch {
    return false;
  }
}
