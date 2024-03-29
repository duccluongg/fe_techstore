import React, { useEffect } from 'react';
import { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styles from './Register.module.css';
import { authSelector, userRegister, clearState } from '../../Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackBar from '../../../components/CustomSnackBar/CustomSnackBar';
import Grow from '@material-ui/core/Grow';
import { showSnackbar } from '../../../components/CustomSnackBar/snackBarSlide';
import { SNACK_BAR_TYPE } from '../../../constants/snackBarType';
import { useHistory } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isSuccess, errorMessage, isError } = useSelector(authSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangePass = (event) => setPassWord(event.target.value);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangeUserName = (event) => setUserName(event.target.value);

  const handleChangeName = (event) => setName(event.target.value);

  const handleChangeAddress = (event) => setAddress(event.target.value);

  const handleChangePhone = (event) => setPhone(event.target.value);

  const onSubmit = () => {
    dispatch(userRegister({ userName, passWord, email, name, address, phone }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      );
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: 'đăng kí thành công',
        })
      );
      setTimeout(history.push('/login'), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <div className={styles.container}>
      <div className={styles.col7}></div>
      <CustomSnackBar />
      <Grow in timeout={1500}>
        <div className={styles.col3}>
          <div className={styles.box}>
            <div className={styles.header}>
              <i className="fas fa-laptop"></i>TechStore
            </div>
            <div className={styles.title}>Sign up for a great experience</div>
            <ValidatorForm onSubmit={onSubmit} className={styles.FormControl}>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Username <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="text"
                  label="Username"
                  variant="filled"
                  name="username"
                  autoComplete="off"
                  size="small"
                  value={userName}
                  onChange={handleChangeUserName}
                  className={styles.textField}
                />
              </div>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Password <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="filled"
                  name="password"
                  onChange={handleChangePass}
                  value={passWord}
                  className={styles.textField}
                  size="small"
                  validators={['required', 'minStringLength:2']}
                  errorMessages={[
                    'PassWord is required',
                    'Must enter 8 characters',
                  ]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Email <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  name="email"
                  type="Email"
                  variant="filled"
                  label="Email"
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                  size="small"
                  validators={['required', 'isEmail']}
                  className={styles.textField}
                  errorMessages={[
                    'Nhập Email',
                    'Email must be a valid email address',
                  ]}
                />
              </div>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Name <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  label="Name"
                  name="name"
                  variant="filled"
                  autoComplete="off"
                  value={name}
                  onChange={handleChangeName}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập tên', 'Không được để trống']}
                  className={styles.textField}
                />
              </div>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Address <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  label="Address"
                  variant="filled"
                  name="address"
                  autoComplete="off"
                  onChange={handleChangeAddress}
                  value={address}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập địa chỉ', 'Không được để trống']}
                  className={styles.textField}
                />
              </div>
              <div className={styles.boxText}>
                <div className={styles.name}>
                  Phone <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  variant="filled"
                  label="Phone"
                  name="phone"
                  autoComplete="off"
                  onChange={handleChangePhone}
                  value={phone}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập số điện thoại', 'Không được để trống']}
                  className={styles.textField}
                />
              </div>
              <div className={styles.button}>
                <button>Sign in</button>
              </div>
            </ValidatorForm>
            <div className={styles.toRegister}>
              Already have Account?{' '}
              <span onClick={() => history.push('/login')}>Login Here</span>
            </div>
            <div className={styles.contact}>
              <div className={styles.subTitle}>Contact us at</div>
              <div className={styles.icon}>
                <div className={styles.facebook}>
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className={styles.google}>
                  <i className="fab fa-github"></i>
                </div>
                <div className={styles.twitter}>
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grow>
    </div>
  );
};

export default Register;
