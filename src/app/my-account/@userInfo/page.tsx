import SignoutForm from 'app/components/my-account/SignoutForm/SignoutForm';
import { validateAccessToken } from 'app/utils/auth/validateAccessToken';
import React from 'react'

export const dynamic = 'force-dynamic'; 

const MyAccountPage = async () => {
  const customer = await validateAccessToken();

  return (
    <div>
      <h2>Account info</h2>
      <section>
        <p>Nombre: {customer?.firstName}</p>
        <p>Email: {customer?.email}</p>
        <SignoutForm />
      </section>
    </div>
  );
}

export default MyAccountPage