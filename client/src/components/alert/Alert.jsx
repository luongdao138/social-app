import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAlert } from '../../redux/actions';
import Loading from '../loading/Loading';
import Toast from '../toast/Toast';

const Alert = () => {
  const notify = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(resetAlert());
  };

  return (
    <div>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          bgColor='bg-danger'
          handleShow={handleShow}
          msg={{ title: 'Error', body: notify.error }}
        />
      )}
      {notify.success && (
        <Toast
          msg={{ title: 'Success', body: notify.success }}
          bgColor='bg-success'
          handleShow={handleShow}
        />
      )}
    </div>
  );
};

export default Alert;
