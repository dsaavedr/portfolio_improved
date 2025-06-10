import { create } from "zustand";

const initialValues = {
  open: false,
  title: null,
  description: null,
  cancelLabel: "Cancel",
  actionLabel: null,
  onAction: () => {},
  onCancel: () => {},
};

interface ConfirmationState {
  open: boolean;
  title: string | null;
  description: string | null;
  cancelLabel: string | null;
  actionLabel: string | null;
  onAction: () => void;
  onCancel: () => void;
}

interface ConfirmationActions {
  openConfirmation: (data: {
    title: string;
    description?: string;
    cancelLabel?: string;
    actionLabel: string;
    onAction: () => void;
    onCancel?: () => void;
  }) => void;
  closeConfirmation: () => void;
}

const useConfirmationStore = create<ConfirmationState & ConfirmationActions>(
  (set) => ({
    ...initialValues,
    openConfirmation: (data) =>
      set(() => ({
        open: true,
        title: data.title,
        description: data.description || initialValues.description,
        cancelLabel: data.cancelLabel || initialValues.cancelLabel,
        actionLabel: data.actionLabel,
        onAction: data.onAction,
        onCancel: data.onCancel || initialValues.onCancel,
      })),
    closeConfirmation: () =>
      set(() => ({
        ...initialValues,
      })),
  }),
);

export default useConfirmationStore;
