import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function Index() {
  const router = useRouter();
  const coo = true;

  useEffect(() => {
    if (!coo) {
      router.push('/auth/login');
    }
  }, [coo]);
  useEffect(() => {
    if (coo) {
      router.push('/workspace');
    }
  }, [coo]);
  return (
    <div>
    </div>
  );
}

export default Index;
