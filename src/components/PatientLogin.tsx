
import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import OTPScreen from './OTPScreen';
import LoadingScreen from './LoadingScreen';
import DashboardPreview from './DashboardPreview';

export type LoginStep = 'welcome' | 'login' | 'otp' | 'loading' | 'dashboard';

const PatientLogin = () => {
  const [currentStep, setCurrentStep] = useState<LoginStep>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleStepChange = (step: LoginStep, phone?: string) => {
    setCurrentStep(step);
    if (phone) {
      setPhoneNumber(phone);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={() => handleStepChange('login')} />;
      case 'login':
        return <LoginScreen onNext={(phone) => handleStepChange('otp', phone)} onBack={() => handleStepChange('welcome')} />;
      case 'otp':
        return <OTPScreen phoneNumber={phoneNumber} onNext={() => handleStepChange('loading')} onBack={() => handleStepChange('login')} />;
      case 'loading':
        return <LoadingScreen onComplete={() => handleStepChange('dashboard')} />;
      case 'dashboard':
        return <DashboardPreview onLogout={() => handleStepChange('welcome')} />;
      default:
        return <WelcomeScreen onNext={() => handleStepChange('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {renderCurrentStep()}
    </div>
  );
};

export default PatientLogin;
