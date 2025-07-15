
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OTPScreenProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

const OTPScreen = ({ phoneNumber, onNext, onBack }: OTPScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
    
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (error) setError('');
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const digits = paste.replace(/\D/g, '').substring(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpComplete) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    const otpCode = otp.join('');
    
    // Simple validation - in real app, this would be server-side
    if (otpCode !== '123456') {
      setError('Invalid verification code. Please try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext();
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(30);
    setError('');
    
    // Simulate resend API call
    setTimeout(() => {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 ml-4">Verify Phone</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 mb-2">
            We've sent a 6-digit code to
          </p>
          <p className="font-semibold text-gray-900">{phoneNumber}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Verification Code
            </label>
            <div className="flex justify-center space-x-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl
                    ${error ? 'border-red-500' : 'border-gray-200'} 
                    focus:border-[hsl(var(--medical-blue))] focus:outline-none focus:ring-4 
                    focus:ring-[hsl(var(--medical-blue))]/10 transition-all duration-200`}
                  disabled={isLoading}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
            
            {error && (
              <div className="medical-error justify-center mt-4">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={!isOtpComplete || isLoading}
            className="medical-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Verify & Continue
              </div>
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm font-medium ${
                canResend 
                  ? 'text-[hsl(var(--medical-blue))] hover:underline' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
            </button>
          </div>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <span className="font-semibold">Demo Mode:</span> Enter "123456" to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
