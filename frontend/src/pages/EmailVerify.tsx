import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import EmailVerifiedSuccessfully from '@/components/verified/EmailVerifiedSuccessfully';
import toast from 'react-hot-toast';
import { emailVerify } from '@/api/email/emailVerify.api';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      const url = `/api/users/${param.userId}/verify/${param.token}`;
      const res = await emailVerify(url);

      if (res.success) {
        setValidUrl(true);
        toast.success('Email verified successfully');
      } else {
        setValidUrl(false);
        toast.error('Invalid URL');
      }
    };
    verifyEmailUrl();
  }, [param]);

  return <>{validUrl ? <EmailVerifiedSuccessfully /> : <NotFound />}</>;
};

export default EmailVerify;
