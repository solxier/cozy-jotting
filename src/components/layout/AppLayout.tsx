
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import NoteSidebar from '../notes/NoteSidebar';
import NoteEditor from '../notes/NoteEditor';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const AppLayout = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  if (!user) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div 
          className={cn(
            "w-64 border-r bg-sidebar transition-all duration-300 flex flex-col",
            isMobile && (sidebarOpen ? "absolute inset-y-0 left-0 z-20" : "w-0 -translate-x-full")
          )}
        >
          <NoteSidebar />
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto relative">
          {/* Mobile sidebar toggle */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 left-4 z-10"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          
          <NoteEditor />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
