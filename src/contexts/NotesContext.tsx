
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from "@/components/ui/use-toast";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NotesContextType = {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: (note: Note | null) => void;
  addNote: () => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load notes from localStorage when user is authenticated
  useEffect(() => {
    if (user) {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        // If there are no notes, create a welcome note
        const welcomeNote: Note = {
          id: `note-${Date.now()}`,
          title: 'Welcome to Notesy!',
          content: `# Welcome to Notesy!\n\nThis is your first note. Some things you can do:\n\n- Create new notes\n- Edit this note\n- Delete notes you don't need\n\nEnjoy taking notes!`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setNotes([welcomeNote]);
        localStorage.setItem('notes', JSON.stringify([welcomeNote]));
      }
    } else {
      // Clear notes when user logs out
      setNotes([]);
      setCurrentNote(null);
    }
  }, [user]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (user && notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, user]);

  const addNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNote(newNote);
    
    toast({
      title: "Note created",
      description: "New note has been created",
    });
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === updatedNote.id 
          ? { ...updatedNote, updatedAt: new Date().toISOString() } 
          : note
      )
    );
    
    setCurrentNote({ ...updatedNote, updatedAt: new Date().toISOString() });
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
    }
    
    toast({
      title: "Note deleted",
      description: "The note has been deleted",
    });
  };

  const value = {
    notes,
    currentNote,
    setCurrentNote,
    addNote,
    updateNote,
    deleteNote
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};
