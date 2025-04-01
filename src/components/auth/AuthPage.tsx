
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Video background with lighter blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          src="https://cdn.pixabay.com/video/2024/09/10/230697_large.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="w-full max-w-md z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Notesy</h1>
          <p className="text-muted-foreground">A minimalist note-taking app</p>
        </div>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-lg border border-border p-6">
          {showLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
