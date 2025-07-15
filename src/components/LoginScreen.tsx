
import React, { useState } from 'react';
import { ArrowLeft, Phone, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onNext: (phoneNumber: string) => void;
  onBack: () => void;
}

const LoginScreen = ({ onNext, onBack }: LoginScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid US phone number (10 digits)
    if (cleaned.length !== 10) {
      return false;
    }
    
    // Check if it starts with a valid area code (not 0 or 1)
    if (cleaned[0] === '0' || cleaned[0] === '1') {
      return false;
    }
    
    return true;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.substring(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (limited.length >= 6) {
      return `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}-${limited.substring(6)}`;
    } else if (limited.length >= 3) {
      return `(${limited.substring(0, 3)}) ${limited.substring(3)}`;
    } else {
      return limited;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext(phoneNumber);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-xl font-semibold text-gray-900 ml-4">Patient Login</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[hsl(var(--medical-blue))] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
          <p className="text-gray-600">We'll send you a verification code to confirm your identity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="(555) 123-4567"
              className={`medical-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
              disabled={isLoading}
              autoComplete="tel"
              aria-describedby={error ? 'phone-error' : undefined}
            />
            {error && (
              <div id="phone-error" className="medical-error">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || phoneNumber.length === 0}
            className="medical-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending OTP...
              </div>
            ) : (
              'Send OTP'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">Secure Login:</span> Your phone number is encrypted and used only for verification purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
