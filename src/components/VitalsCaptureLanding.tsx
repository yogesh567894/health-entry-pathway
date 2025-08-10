import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Clock, TrendingUp } from 'lucide-react';

interface VitalsCaptureLandingProps {
  onStartCapture: () => void;
  onViewResults: () => void;
}

const VitalsCaptureLanding = ({ onStartCapture, onViewResults }: VitalsCaptureLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthMonitor</h1>
          <p className="text-gray-600 text-lg">Remote Patient Monitoring</p>
        </div>

        {/* Main Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 mb-2">Vitals Capture</CardTitle>
            <p className="text-gray-600">
              Place your finger on the camera to measure your heart rate, oxygen saturation, and other vital signs.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={onStartCapture}
              className="medical-btn-primary w-full"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start Vitals Recording
            </Button>
            
            <Button 
              onClick={onViewResults}
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-2"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              View Last Results
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">How it works:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[hsl(var(--medical-blue))] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-gray-700">Place your finger gently on the rear camera</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[hsl(var(--medical-blue))] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-gray-700">Keep still for 30 seconds during recording</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[hsl(var(--medical-blue))] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-gray-700">Review your vitals and health trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <Clock className="w-6 h-6 text-[hsl(var(--medical-blue))] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">30s</p>
              <p className="text-sm text-gray-600">Recording Time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Activity className="w-6 h-6 text-[hsl(var(--medical-blue))] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Vital Signs</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VitalsCaptureLanding;