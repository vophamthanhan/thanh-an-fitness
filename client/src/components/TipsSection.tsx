// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Tips & important notes section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TIPS, PROFILE, SUPPLEMENT_SCHEDULE } from '@/lib/fitnessData';
import { AlertTriangle, CheckCircle2, Clock, Dumbbell, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TipsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    }),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Mẹo & Lưu Ý Quan Trọng
      </h2>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TIPS.map((tip, i) => (
          <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="bg-card border-border/50 hover:border-lime/20 transition-all h-full">
              <CardContent className="p-5">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Important Warning */}
      <motion.div custom={6} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-rose-accent/5 border-rose-accent/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-rose-accent">
              <AlertTriangle className="w-5 h-5" />
              Cảnh Báo Quan Trọng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Giảm 10kg trong 30 ngày là mục tiêu <strong className="text-foreground">AGGRESSIVE</strong>. 
              Cần theo dõi sức khỏe chặt chẽ và lắng nghe cơ thể.
            </p>
            <div className="space-y-2">
              {[
                'Nếu cảm thấy chóng mặt, mệt mỏi quá mức → Tăng calo lên 1,800-2,000 kcal',
                'Tuần đầu có thể mất 3-4kg nước + glycogen, sau đó chậm lại → Bình thường',
                'Nếu mất sức khi tập → Giảm volume, tăng rest time',
                'Không nên kéo dài chế độ này quá 30 ngày liên tục',
                'Tham khảo ý kiến bác sĩ nếu có bệnh lý nền',
              ].map((warning, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{warning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Schedule */}
      <motion.div custom={7} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-lime" />
              Lịch Trình Hàng Ngày
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border/50" />
              
              <div className="space-y-4">
                {[
                  { time: '5:30', label: 'Thức dậy', desc: 'Uống 500ml nước, cân nặng', icon: '🌅', color: 'bg-amber-accent/20 text-amber-accent' },
                  { time: '6:00', label: 'Bữa sáng', desc: 'Whey + Khoai lang + Hạt chia + Ổi', icon: '🍳', color: 'bg-lime/20 text-lime' },
                  { time: '8:00', label: 'Đi làm', desc: 'Mang theo bữa trưa đã chuẩn bị', icon: '💼', color: 'bg-chart-5/20 text-chart-5' },
                  { time: '12:00', label: 'Bữa trưa', desc: 'Ức gà 200g + Khoai lang + Dưa leo', icon: '🍗', color: 'bg-lime/20 text-lime' },
                  { time: '16:00', label: 'Pre-workout', desc: 'Ức gà 100g + Dưa leo + Creatine 5g', icon: '⚡', color: 'bg-amber-accent/20 text-amber-accent' },
                  { time: '17:30', label: 'Tan làm → Gym', desc: 'Đến phòng gym, warm-up', icon: '🏋️', color: 'bg-lime/20 text-lime' },
                  { time: '18:00', label: 'Tập luyện', desc: '60-75 phút tập nặng + Cardio', icon: '💪', color: 'bg-rose-accent/20 text-rose-accent' },
                  { time: '19:00', label: 'Post-workout', desc: 'Whey + Ức gà + Khoai lang + Dưa leo', icon: '🥤', color: 'bg-lime/20 text-lime' },
                  { time: '21:00', label: 'Thư giãn', desc: 'Stretching nhẹ, foam rolling', icon: '🧘', color: 'bg-chart-5/20 text-chart-5' },
                  { time: '22:00', label: 'Đi ngủ', desc: 'Ngủ đủ 7-8 tiếng', icon: '😴', color: 'bg-muted text-muted-foreground' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-lg z-10 flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="stat-number text-sm text-lime">{item.time}</span>
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Checklist */}
      <motion.div custom={8} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-lime" />
              Checklist Hàng Ngày
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Cân nặng buổi sáng (sau vệ sinh, trước ăn)',
                'Uống đủ 3-4 lít nước',
                'Ăn đúng 4 bữa theo plan',
                'Tập luyện theo lịch',
                'Cardio sau tập',
                'Uống 2 scoop Whey (sáng + sau tập)',
                'Uống 5g Creatine (trước tập)',
                'Ngủ đủ 7-8 tiếng',
                'Ghi nhận tiến trình trên web',
                'Uống 2-3 ly trà xanh không đường',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <div className="w-5 h-5 rounded-full border-2 border-lime/50 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience & Techniques */}
      <motion.div custom={9} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-amber-accent" />
              Kỹ Thuật Tập Luyện
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'Straight Sets',
                  desc: 'Tập bình thường, nghỉ giữa các set. Dùng ở Tuần 1-2.',
                  phase: 'Tuần 1-2',
                  color: 'border-lime/30',
                },
                {
                  name: 'Superset',
                  desc: '2 bài liên tiếp không nghỉ. Tăng volume và đốt calo.',
                  phase: 'Tuần 3-4',
                  color: 'border-amber-accent/30',
                },
                {
                  name: 'Dropset',
                  desc: 'Giảm tạ liên tục không nghỉ. Đẩy cơ đến failure.',
                  phase: 'Tuần 3-4',
                  color: 'border-rose-accent/30',
                },
                {
                  name: 'FST-7',
                  desc: '7 sets × 12 reps, nghỉ 30s. Bài cuối cùng trong buổi tập.',
                  phase: 'Tuần 3-4',
                  color: 'border-chart-5/30',
                },
              ].map((tech, i) => (
                <div key={i} className={`p-4 rounded-xl bg-secondary/30 border ${tech.color}`}>
                  <h4 className="font-semibold text-foreground mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{tech.desc}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{tech.phase}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Motivation */}
      <motion.div custom={10} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-gradient-to-br from-lime/10 via-card to-amber-accent/10 border-lime/20">
          <CardContent className="p-8 text-center">
            <Heart className="w-10 h-10 text-lime mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Kỷ luật là cầu nối giữa mục tiêu và thành tựu"
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Anh Thành An đã có 4 năm kinh nghiệm tập luyện. Cơ thể anh có "muscle memory" — 
              việc quay lại sẽ nhanh hơn người mới. Hãy tin tưởng vào quá trình!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
