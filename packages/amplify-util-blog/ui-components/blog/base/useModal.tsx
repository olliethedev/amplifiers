import React, { useMemo, useState } from "react";
import Modal from "./Modal";

export const useModal = (
  initialState: boolean = false,
  onClose?: (() => void) | undefined
) => {
  const [isOpen, setIsOpen] = useState(initialState);
  return useMemo(
    () => ({
      Modal: ({
        children,
        title,
      }: {
        children?: React.ReactNode;
        title: string;
      }) => (
        <Modal
          title={title}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            onClose && onClose();
          }}
        >
          {children}
        </Modal>
      ),
      toggleModal: () => {
        setIsOpen(!isOpen);
        onClose && onClose();
      },
      isModalOpen: isOpen,
    }),
    [isOpen, onClose]
  );
};
