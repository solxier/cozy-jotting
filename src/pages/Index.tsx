
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../components/auth/AuthPage';
import AppLayout from '../components/layout/AppLayout';
import { NotesProvider } from '../contexts/NotesContext';

const Index = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-medium">Loading...</div>
      </div>
    );
  }

  return user ? (
    <NotesProvider>
      <AppLayout />
    </NotesProvider>
  ) : (
    <AuthPage />
  );
};

export default Index;
