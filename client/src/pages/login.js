import { Formik, Form, useField } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useToggle } from '../hooks';
import { login } from '../redux/actions';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be 6 characters to 30 characters!')
    .max(30, 'Password must be 6 characters to 30 characters!'),
});

const MyInput = ({ label, children, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className='pass'>
        <input {...props} {...field} />
        {children}
      </div>
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const [showPw, togglePw] = useToggle();
  const handleLogin = (values, helpers) => {
    dispatch(login(values));
  };

  return (
    <div className='auth_page'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className='auth_form'>
            <h3 className='text-uppercase text-center mb-3'>L-Network</h3>
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
            <button
              type='submit'
              className='btn btn-dark w-100 mt-3'
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>

            <p className='my-2'>
              You don't have an account?{' '}
              <Link to='/register' style={{ color: 'crimson' }}>
                Register now
              </Link>
            </p>
            {/* {JSON.stringify(formik)} */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
