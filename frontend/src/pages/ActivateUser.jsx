import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';

function ActivateUser() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    async function activateUser(activationLink) {
      await AuthService.activateUser(activationLink);
    }
    activateUser(token);
    navigate('/');
  }, [navigate, token]);

  return (
    <main>
      <section className="absolute w-full h-full bg-gray-900"></section>
    </main>
  );
}

export default ActivateUser;
