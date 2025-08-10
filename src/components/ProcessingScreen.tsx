import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Upload, Brain, Activity, CheckCircle } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Upload, label: 'Uploading Video', duration: 3000 },
    { icon: Brain, label: 'Analyzing Signal', duration: 7000 },
    { icon: Activity, label: 'Extracting Vitals', duration: 5000 },
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = (elapsed / totalDuration) * 100;
      setProgress(newProgress);

      // Update current step based on elapsed time
      let stepElapsed = 0;
      for (let i = 0; i < steps.length; i++) {
        if (elapsed <= stepElapsed + steps[i].duration) {
          setCurrentStep(i);
          break;
        }
        stepElapsed += steps[i].duration;
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Activity className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Vitals</h2>
        <p className="text-gray-600 mb-8">
          Please wait while we analyze your recording using advanced AI algorithms.
        </p>

        {/* Progress Steps */}
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[hsl(var(--medical-blue-light))] border-2 border-[hsl(var(--medical-blue))]'
                    : isComplete
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[hsl(var(--medical-blue))] text-white'
                      : isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p
                    className={`font-semibold ${
                      isActive
                        ? 'text-[hsl(var(--medical-blue))]'
                        : isComplete
                        ? 'text-green-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {isActive && (
                    <p className="text-sm text-gray-600 mt-1">Processing...</p>
                  )}
                  {isComplete && (
                    <p className="text-sm text-green-600 mt-1">Complete</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Technical Note */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Processing with AI:</span> We use 
            photoplethysmography (PPG) technology to detect blood volume changes through 
            your camera's light sensor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;