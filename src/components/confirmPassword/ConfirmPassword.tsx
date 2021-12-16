import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { AddNewPassType } from '../../api/forgotPasswordApi';
import { forgotPassAddEmailTC } from '../../store/middlewares/forgotPassAddEmailTC';
import style from '../../style/Common.module.css';

import { ReturnComponentType } from 'types';

export const ConfirmPassword = (): ReturnComponentType => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShown, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  const dataPayload: AddNewPassType = {
    email,
    from: 'test-front-admin <samutic40@gmail.com>',
    message: `<div style='background-color: #ffd500; 
padding: 15px; 
border-color: #ff9900; 
width: 250px;
height: 30px'> 
password recovery link: <a href='http://localhost:3000/#/createNewPassword/$token$'> recovery link </a></div>`,
  };

  const onSendButtonClick = (): void => {
    setEmail('');
    setLoading(true);
    dispatch(forgotPassAddEmailTC(dataPayload, setLoading, setShowMessage));
  };
  const onEmailInputEnter = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  if (isShown) {
    return <Navigate to="/popup" />;
  }

  return (
    <div className={style.mainContainer}>
      {loading ? (
        <div>Sending...</div>
      ) : (
        <div className={style.content}>
          <h2>Forgot your password?</h2>
          {/* <CustomInput title="Email" /> */}

          <input
            className={style.inputEmail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={onEmailInputEnter}
            required
          />

          <p> Enter your email and we will send you further instructions</p>
          <div>
            <button className={style.btn} onClick={onSendButtonClick}>
              send instructions
            </button>
          </div>
          <span>Did you remember your password?</span>
          <Link to="/login"> Try logging in </Link>
        </div>
      )}
    </div>
  );
};
