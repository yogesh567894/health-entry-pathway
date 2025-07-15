
import React, { useEffect } from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Successful!</h2>
        <p className="text-gray-600 mb-8">Setting up your patient dashboard...</p>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-8">
          <div className="w-8 h-8 border-4 border-[hsl(var(--medical-blue))]/20 border-t-[hsl(var(--medical-blue))] rounded-full animate-spin"></div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            Phone number verified
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            Secure connection established
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[hsl(var(--medical-blue))]/20 border-t-[hsl(var(--medical-blue))] rounded-full animate-spin mr-2"></div>
            Loading dashboard...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
