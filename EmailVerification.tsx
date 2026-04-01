import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Mail } from 'lucide-react';

export const EmailVerification = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type === 'signup' && token) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup',
        });

        if (error) {
          setStatus('error');
          setMessage(error.message);
          toast.error('Email verification failed');
        } else {
          setStatus('success');
          setMessage('Email verified successfully! You can now sign in.');
          toast.success('Email verified!');
        }
      } else {
        setStatus('error');
        setMessage('Invalid verification link');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <CardTitle className="text-2xl">Verifying Email</CardTitle>
            <CardDescription>Please wait while we verify your email address...</CardDescription>
          </>
        );

      case 'success':
        return (
          <>
            <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Email Verified!</CardTitle>
            <CardDescription>{message}</CardDescription>
            <CardContent className="pt-4">
              <Button onClick={() => navigate('/auth')} className="w-full">
                Continue to Sign In
              </Button>
            </CardContent>
          </>
        );

      case 'error':
        return (
          <>
            <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Verification Failed</CardTitle>
            <CardDescription>{message}</CardDescription>
            <CardContent className="pt-4">
              <Button onClick={() => navigate('/auth')} variant="outline" className="w-full">
                Back to Sign In
              </Button>
            </CardContent>
          </>
        );
    }
  };

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm w-full max-w-md">
        <CardHeader className="text-center">
          {renderContent()}
        </CardHeader>
      </Card>
    </div>
  );
};
