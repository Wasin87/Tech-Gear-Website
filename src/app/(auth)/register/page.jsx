import RegisterForm from '@/components/Form/RegisterForm';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <div>
        <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
        </div>
    );
};

export default page;