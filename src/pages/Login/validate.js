import axios from 'axios';

const loginAPI = 'https://xebiascart.herokuapp.com/users';

export const USER_NAME_NOT_FOUND = 'USER_NAME_NOT_FOUND';

export class UserNameExeption {
  constructor(name, msg) {
    this.name = name;
    this.msg = msg;
  }
}
export const initialValues = {
  username: '',
  password: '',
  general: '',
};

export const onSubmit = async (values, onSubmitProps) => {
  try {
    await axios
      .get(`${loginAPI}?username=${values.username}`)
      .then((response) => response)
      .then((data) => {
        if (data.status === 200 && !data.data.length) {
          throw new UserNameExeption(
            USER_NAME_NOT_FOUND,
            `Username ${values.username} not found.`
          );
        } else if (data.status === 200) {
        }
      });
  } catch (error) {
    if (error.name === USER_NAME_NOT_FOUND) {
      onSubmitProps.setFieldError('username', error.msg);
    } else if (error.response.status === 500) {
      onSubmitProps.setFieldError('general', error.response.statusText);
    } else {
      console.log('Some connectivity issue');
    }
  } finally {
    setTimeout(() => {
      onSubmitProps.resetForm();
    }, 3000);
  }
};

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
export const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  } else if (!/^[a-z]{3,5}$/.test(values.username)) {
    errors.username =
      'Username is invalid must be between 3 to 5 characters and lowercase.';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!/^[a-zA-Z0-9]{5,8}$/.test(values.password)) {
    errors.password = 'Password is invalid must be between 3 to 8 characters.';
  }
  return errors;
};
