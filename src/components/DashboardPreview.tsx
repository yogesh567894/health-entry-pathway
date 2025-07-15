
import React from 'react';
import { Heart, Activity, Thermometer, Calendar, Bell, User, LogOut, TrendingUp } from 'lucide-react';

interface DashboardPreviewProps {
  onLogout: () => void;
}

const DashboardPreview = ({ onLogout }: DashboardPreviewProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[hsl(var(--medical-blue))] rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">HealthMonitor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h2>
          <p className="text-gray-600">Here's your health summary for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Heart Rate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">72 BPM</p>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-xs text-green-600 mt-1">Normal range</p>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-[hsl(var(--medical-blue))]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">118/78</p>
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-xs text-green-600 mt-1">Optimal</p>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <div className="w-5 h-5"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98.6°F</p>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-xs text-gray-500 mt-1">Last updated 2h ago</p>
            </div>
          </div>

          {/* Next Appointment */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Tomorrow</p>
              <p className="text-sm text-gray-600">Next Checkup</p>
              <p className="text-xs text-gray-500 mt-1">Dr. Johnson - 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Heart rate recorded</p>
                  <p className="text-xs text-gray-500">72 BPM - 2 minutes ago</p>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[hsl(var(--medical-blue))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Blood pressure measured</p>
                  <p className="text-xs text-gray-500">118/78 mmHg - 1 hour ago</p>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Optimal</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Appointment reminder</p>
                  <p className="text-xs text-gray-500">Dr. Johnson tomorrow at 2:00 PM</p>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPreview;
