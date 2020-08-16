import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldError } from './FieldError';
import { validate, onSubmit, initialValues } from './validate';
import './style.css';

const Login = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className='wrapper-bg'>
            <div className='login-form'>
              <div className='title'>
                <i class='im im-shopping-cart'></i>
                <h2>Welcome to Shopping Cart</h2>
              </div>
              <Form className='login' method='post'>
                <div className='form-control'>
                  <label htmlFor='username' class='label'>
                    User Name
                  </label>
                  <Field
                    id='username'
                    name='username'
                    type='text'
                    maxLength='5'
                    placeholder='Username'
                    autoComplete='username'
                  />
                  <ErrorMessage name='username' component={FieldError} />
                </div>
                <div className='form-control'>
                  <label htmlFor='password' class='label'>
                    Password
                  </label>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    maxLength='8'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <ErrorMessage name='password' component={FieldError} />
                </div>
                <ErrorMessage name='general' component={FieldError} />
                <button
                  type='submit'
                  className='continue'
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Contine
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
