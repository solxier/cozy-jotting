
import React, { useState } from 'react';
import { useNotes, Note } from '../../contexts/NotesContext';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const NoteSidebarItem = ({ note, isActive, onClick, onDelete }: { 
  note: Note;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) => {
  // Extract the first line for preview
  const previewContent = note.content
    .split('\n')
    .filter(line => line.trim() !== '')
    .slice(0, 1)
    .join(' ')
    .replace(/[#*_~`]/g, '')
    .substring(0, 60);

  return (
    <div 
      className={cn(
        "p-3 mb-2 rounded-md cursor-pointer group hover:bg-accent transition-colors",
        isActive && "bg-primary/10 hover:bg-primary/10"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium truncate text-sm">{note.title}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" 
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground truncate">{previewContent || "Empty note"}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {format(new Date(note.updatedAt), 'MMM d, yyyy')}
      </p>
    </div>
  );
};

const NoteSidebar = () => {
  const { notes, currentNote, setCurrentNote, addNote, deleteNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    setDeleteTarget(noteId);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteNote(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={addNote} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-4 pb-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteSidebarItem
              key={note.id}
              note={note}
              isActive={currentNote?.id === note.id}
              onClick={() => setCurrentNote(note)}
              onDelete={(e) => handleDeleteClick(e, note.id)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {searchQuery ? "No notes match your search" : "No notes yet"}
          </div>
        )}
      </ScrollArea>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This note will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NoteSidebar;
