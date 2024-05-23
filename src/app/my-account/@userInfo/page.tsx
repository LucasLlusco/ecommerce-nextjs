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
        <p>email: {customer?.email}</p>
      </section>
    </div>
  );
}

export default MyAccountPage