import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const useAuth = (redirectUrl = '/') => {
  const auth = useSelector((state) => state.auth);

  console.log(auth);
};
