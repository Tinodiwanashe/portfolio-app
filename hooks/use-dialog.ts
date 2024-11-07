"use client";

import { create } from 'zustand';

interface DialogProps {
    title: string | null;
    description: string | null;
    children: React.ReactNode | null;
    isOpen: boolean;
    onOpen: (data: {
        title: string;
        description: string;
        children: React.ReactNode;
    }) => void;
    onClose: () => void;
/*     children: any;
    setChildren(children: any): void; */
}



export const useDialog = create<DialogProps>((set) => ({
    title: null,
    description: null,
    isOpen: false,
    children: null,
    onOpen: (data) => set((state) => ({ 
        isOpen: true,
        title: data.title,
        description: data.description,
        children: data.children
    })),
    onClose: () => set({ 
        isOpen: false,
        title: null,
        description: null,
        children: null
    })
}));
