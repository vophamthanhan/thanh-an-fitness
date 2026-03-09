// ============================================================
// DESIGN: "Warrior's Journey" - Dark Athletic Premium
// Main page with tab-based navigation for all sections
// ============================================================
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroSection from '@/components/HeroSection';
import DashboardSection from '@/components/DashboardSection';
import WorkoutSection from '@/components/WorkoutSection';
import NutritionSection from '@/components/NutritionSection';
import TrackingSection from '@/components/TrackingSection';
import TipsSection from '@/components/TipsSection';
import { Dumbbell, UtensilsCrossed, BarChart3, Lightbulb, LayoutDashboard } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStart={() => setActiveTab('dashboard')} />

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex flex-wrap gap-1 bg-secondary/50 p-1.5 rounded-xl h-auto mb-8">
            <TabsTrigger
              value="dashboard"
              className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-lime data-[state=active]:text-lime-foreground py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Tổng Quan</span>
              <span className="sm:hidden">Tổng Quan</span>
            </TabsTrigger>
            <TabsTrigger
              value="workout"
              className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-lime data-[state=active]:text-lime-foreground py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Lịch Tập</span>
              <span className="sm:hidden">Tập</span>
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-lime data-[state=active]:text-lime-foreground py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Dinh Dưỡng</span>
              <span className="sm:hidden">Ăn</span>
            </TabsTrigger>
            <TabsTrigger
              value="tracking"
              className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-lime data-[state=active]:text-lime-foreground py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Tiến Trình</span>
              <span className="sm:hidden">Theo Dõi</span>
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-lime data-[state=active]:text-lime-foreground py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Mẹo & Lưu Ý</span>
              <span className="sm:hidden">Mẹo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <DashboardSection />
          </TabsContent>
          <TabsContent value="workout" className="mt-0">
            <WorkoutSection />
          </TabsContent>
          <TabsContent value="nutrition" className="mt-0">
            <NutritionSection />
          </TabsContent>
          <TabsContent value="tracking" className="mt-0">
            <TrackingSection />
          </TabsContent>
          <TabsContent value="tips" className="mt-0">
            <TipsSection />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Kế Hoạch Giảm Cân 30 Ngày - Thành An</p>
          <p className="mt-1 text-xs">Dữ liệu được lưu trữ trên trình duyệt của bạn (localStorage)</p>
        </div>
      </footer>
    </div>
  );
}
