import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import VitalsApp from '@/components/VitalsApp';
import DashboardPreview from '@/components/DashboardPreview';

const MainTabs = () => {
  const [value, setValue] = useState<string>('vitals');

  return (
    <Tabs value={value} onValueChange={setValue} className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <div className="bg-white/80 backdrop-blur border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[hsl(var(--medical-blue))] rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">HealthMonitor</span>
          </div>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <TabsContent value="dashboard" className="m-0">
          <DashboardPreview showHeader={false} onLogout={() => setValue('vitals')} onCaptureVitals={() => setValue('vitals')} />
        </TabsContent>
        <TabsContent value="vitals" className="m-0">
          <VitalsApp />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default MainTabs;
