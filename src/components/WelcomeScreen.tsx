
import React from 'react';
import { Heart, Shield, Activity } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo and Branding */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthMonitor</h1>
          <p className="text-lg text-gray-600">Remote Patient Monitoring</p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-[hsl(var(--medical-blue))]" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Real-time Monitoring</h3>
              <p className="text-sm text-gray-600">Track your vital signs 24/7</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Secure & Private</h3>
              <p className="text-sm text-gray-600">HIPAA compliant platform</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="medical-btn-primary w-full"
          aria-label="Access patient login"
        >
          Patient Login
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[hsl(var(--medical-blue))] underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[hsl(var(--medical-blue))] underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
