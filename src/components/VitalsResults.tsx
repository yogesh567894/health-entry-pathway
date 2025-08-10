import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Droplets, Thermometer, Activity, Download, Share, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface VitalsResultsProps {
  onBack: () => void;
  onNewRecording: () => void;
}

const VitalsResults = ({ onBack, onNewRecording }: VitalsResultsProps) => {
  // Mock realistic vitals data
  const vitals = {
    heartRate: 72,
    spO2: 98,
    bloodPressure: { systolic: 118, diastolic: 76 },
    temperature: 36.8,
    timestamp: new Date().toLocaleString(),
  };

  // Mock historical data for trends
  const trendData = [
    { day: 'Mon', hr: 68, spo2: 97 },
    { day: 'Tue', hr: 70, spo2: 98 },
    { day: 'Wed', hr: 74, spo2: 97 },
    { day: 'Thu', hr: 69, spo2: 99 },
    { day: 'Fri', hr: 72, spo2: 98 },
  ];

  const getVitalStatus = (type: string, value: number | { systolic: number; diastolic: number }) => {
    switch (type) {
      case 'heartRate':
        const hr = value as number;
        if (hr >= 60 && hr <= 100) return { status: 'normal', color: 'bg-green-500' };
        if (hr < 60 || hr > 100) return { status: 'warning', color: 'bg-yellow-500' };
        return { status: 'error', color: 'bg-red-500' };
      
      case 'spO2':
        const spo2 = value as number;
        if (spo2 >= 95) return { status: 'normal', color: 'bg-green-500' };
        if (spo2 >= 90) return { status: 'warning', color: 'bg-yellow-500' };
        return { status: 'error', color: 'bg-red-500' };
      
      case 'bloodPressure':
        const bp = value as { systolic: number; diastolic: number };
        if (bp.systolic < 130 && bp.diastolic < 80) return { status: 'normal', color: 'bg-green-500' };
        if (bp.systolic < 140 && bp.diastolic < 90) return { status: 'warning', color: 'bg-yellow-500' };
        return { status: 'error', color: 'bg-red-500' };
      
      case 'temperature':
        const temp = value as number;
        if (temp >= 36.1 && temp <= 37.2) return { status: 'normal', color: 'bg-green-500' };
        if (temp >= 35.5 && temp <= 37.8) return { status: 'warning', color: 'bg-yellow-500' };
        return { status: 'error', color: 'bg-red-500' };
      
      default:
        return { status: 'normal', color: 'bg-green-500' };
    }
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    // Mock export functionality
    const data = format === 'pdf' 
      ? 'Mock PDF data...' 
      : 'Date,Heart Rate,SpO2,Blood Pressure,Temperature\n' + 
        `${vitals.timestamp},${vitals.heartRate},${vitals.spO2},${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic},${vitals.temperature}`;
    
    const blob = new Blob([data], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vitals-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Vitals Results</h1>
          <div className="w-16"></div>
        </div>

        {/* Timestamp */}
        <div className="text-center mb-6">
          <p className="text-gray-600">Recorded on {vitals.timestamp}</p>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Heart Rate */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Heart Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{vitals.heartRate}</p>
                    <p className="text-sm text-gray-500">bpm</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getVitalStatus('heartRate', vitals.heartRate).color}`}></div>
              </div>
            </CardContent>
          </Card>

          {/* SpO2 */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Oxygen</p>
                    <p className="text-2xl font-bold text-gray-900">{vitals.spO2}</p>
                    <p className="text-sm text-gray-500">%</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getVitalStatus('spO2', vitals.spO2).color}`}></div>
              </div>
            </CardContent>
          </Card>

          {/* Blood Pressure */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                    </p>
                    <p className="text-sm text-gray-500">mmHg</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getVitalStatus('bloodPressure', vitals.bloodPressure).color}`}></div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">{vitals.temperature}</p>
                    <p className="text-sm text-gray-500">°C</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getVitalStatus('temperature', vitals.temperature).color}`}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal Range</Badge>
              <p className="text-gray-700">All vitals are within healthy parameters</p>
            </div>
            <p className="text-sm text-gray-600">
              Your vital signs look good! Continue monitoring regularly and consult your healthcare 
              provider if you notice any concerning changes.
            </p>
          </CardContent>
        </Card>

        {/* 7-Day Trend Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7-Day Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="hr" 
                    stroke="hsl(var(--medical-blue))" 
                    strokeWidth={2}
                    name="Heart Rate"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spo2" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="SpO2"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleExport('pdf')}
              variant="outline"
              className="h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              onClick={() => handleExport('csv')}
              variant="outline"
              className="h-12"
            >
              <Share className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <Button
            onClick={onNewRecording}
            className="medical-btn-primary w-full"
          >
            Take New Recording
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VitalsResults;