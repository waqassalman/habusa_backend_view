import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../components/toastSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`text-white px-4 py-2 rounded shadow-md ${bgColor} transition-all`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
