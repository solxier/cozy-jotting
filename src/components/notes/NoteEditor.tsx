
import React, { useState, useEffect, useRef } from 'react';
import { useNotes, Note } from '../../contexts/NotesContext';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NoteEditor = () => {
  const { currentNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  
  // Initialize editor with current note data
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  // Auto-save note changes
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (currentNote && (title !== currentNote.title || content !== currentNote.content)) {
        const updatedNote: Note = {
          ...currentNote,
          title,
          content
        };
        updateNote(updatedNote);
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [title, content, currentNote, updateNote]);

  if (!currentNote) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center px-4">
          Select a note from the sidebar or create a new one
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <Input
        ref={titleRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="text-xl font-medium border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 mb-4"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        className="flex-1 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-light"
      />
    </div>
  );
};

export default NoteEditor;
