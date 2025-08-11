import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Brain, Activity, CheckCircle } from 'lucide-react';
import { useVitalsDemo } from '@/context/VitalsDemoContext';

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const { settings } = useVitalsDemo();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { icon: Upload, label: 'Uploading Video', duration: 3000 },
    { icon: Brain, label: 'Analyzing Signal', duration: 7000 },
    { icon: Activity, label: 'Extracting Vitals', duration: 5000 },
  ];

useEffect(() => {
    if (error) return;

    const multiplier = settings.fastMode ? 0.3 : 1;
    const scaledSteps = steps.map((s) => ({ ...s, duration: s.duration * multiplier }));
    const totalDuration = scaledSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on elapsed time
      let stepElapsed = 0;
      for (let i = 0; i < scaledSteps.length; i++) {
        if (elapsed <= stepElapsed + scaledSteps[i].duration) {
          setCurrentStep(i);
          break;
        }
        stepElapsed += scaledSteps[i].duration;
      }

      // Inject demo error states
      if (settings.forceUploadFailure && elapsed >= scaledSteps[0].duration) {
        clearInterval(interval);
        setError('Upload failed. Please try again.');
        return;
      }
      if (settings.forceNetworkIssue && newProgress >= 50) {
        clearInterval(interval);
        setError('Network issue detected. Check your connection and retry.');
        return;
      }
      if (settings.forceProcessingTimeout && newProgress >= 85) {
        clearInterval(interval);
        setError('Processing timed out. Please try again.');
        return;
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, settings, error]);

  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Activity className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Vitals</h2>
        <p className="text-gray-600 mb-6">
          Please wait while we analyze your recording using advanced AI algorithms.
        </p>

        {error && (
          <div className="mb-6">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}


        {/* Progress Steps */}
        {!error && (
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
        )}

        {/* Overall Progress Bar */}
        {!error && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        )}

        {error && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleRetry} className="medical-btn-primary">Retry</Button>
          </div>
        )}


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