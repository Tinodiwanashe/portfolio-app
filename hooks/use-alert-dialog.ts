"use client";

import { create } from 'zustand';

interface AlertDialogProps {
    isOpen: boolean;
    title: string | null;
    description: string | null;
    cancelLabel: string | null;
    actionLabel: string | null;
    onAction: () => void;
    onCancel: () => void;
    onOpen: (data: {
        title: string;
        description: string;
        cancelLabel: string;
        actionLabel: string;
        onAction: () => void;
        onCancel: () => void;
    }) => void;
    onClose: () => void;
/*     children: any;
    setChildren(children: any): void; */
}



export const useAlertDialog = create<AlertDialogProps>((set) => ({
    isOpen: false,
    title: null,
    description: null,
    cancelLabel: null,
    actionLabel: null,
    onAction: () => {},
    onCancel: () => {},
    onOpen: (data) => set((state) => ({ 
        isOpen: true,
        title: data.title,
        description: data.description,
        cancelLabel: data.cancelLabel,
        actionLabel: data.actionLabel,
        onAction: () => data.onAction,
        onCancel: () => data.onCancel
    })),
    onClose: () => set((state) => ({ 
        isOpen: false,
        title: null,
        description: null,
        cancelLabel: null,
        actionLabel: null,
        onAction: () => {},
        onCancel: () => {}
    }))
}));
