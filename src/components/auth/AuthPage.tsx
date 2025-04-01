
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Notesy</h1>
          <p className="text-muted-foreground">A minimalist note-taking app</p>
        </div>
        
        {showLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
