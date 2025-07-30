import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const showModal = (message, title = '提示') => {
    setMessage(message);
    setTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
    setTitle('');
  };

  return {
    isOpen,
    message,
    title,
    showModal,
    closeModal
  };
};