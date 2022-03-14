import { Formik, Form, useField } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useToggle } from '../hooks';
import { register } from '../redux/actions';

const initialValues = {
  email: '',
  password: '',
  fullname: '',
  username: '',
  cf_password: '',
  gender: 'male',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be 6 characters to 30 characters!')
    .max(30, 'Password must be 6 characters to 30 characters!'),
  fullname: Yup.string()
    .required('Full name is required!')
    .max(25, 'Full name can not be more than 25 characters!'),
  username: Yup.string()
    .required('User name is required!')
    .max(25, 'User name can not be more than 25 characters!'),
  cf_password: Yup.string()
    .required('Confirm password is required!')
    .when('password', (password, schema) => {
      if (password) {
        return schema.oneOf([password], 'Password must match!');
      }
    }),
});

const MyInput = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className='pass'>
        <input {...props} {...field} />
        {children}
      </div>
      {meta.touched && meta.error ? <span className='error text-danger '>{meta.error}</span> : null}
    </div>
  );
};

const MySelect = ({ label, chilren, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className='custom-select' {...field} {...props} />
      {meta.touched && meta.error ? <span className='error text-danger '>{meta.error}</span> : null}
    </div>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [showPw, togglePw] = useToggle();
  const [showCfPw, toggleCfPw] = useToggle();

  const handleRegister = (values, helpers) => {
    const { cf_password, ...data } = values;
    dispatch(register(data));
  };

  if (auth.token) return <Navigate to='/' />;

  return (
    <div className='auth_page'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className='auth_form'>
            <h3 className='text-uppercase text-center mb-3'>L-Network</h3>
            <MyInput label='Full name' className='form-control' id='fullname' name='fullname' />
            <MyInput label='User name' className='form-control' id='username' name='username' />
            <MyInput label='Email address' className='form-control' id='email' name='email' />
            <MyInput
              label='Password'
              type={showPw ? 'text' : 'password'}
              className='form-control'
              id='password'
              name='password'
              aria-describedby='pass'
            >
              <small onClick={togglePw} style={{ cursor: 'pointer' }} id='pass'>
                {showPw ? 'Hide' : 'Show'}
              </small>
            </MyInput>
            <MyInput
              label='Confirm password'
              type={showCfPw ? 'text' : 'password'}
              className='form-control'
              id='cf_password'
              name='cf_password'
              aria-describedby='pass'
            >
              <small onClick={toggleCfPw} style={{ cursor: 'pointer' }} id='pass'>
                {showPw ? 'Hide' : 'Show'}
              </small>
            </MyInput>
            <MySelect name='gender' id='gender' label='Gender'>
              <>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </>
            </MySelect>
            <button type='submit' className='btn btn-dark w-100 mt-3' disabled={!formik.isValid}>
              Register
            </button>

            <p className='my-2'>
              You already have an account?{' '}
              <Link to='/login' style={{ color: 'crimson' }}>
                Login now
              </Link>
            </p>
            {/* {JSON.stringify(formik)} */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
