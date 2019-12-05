import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  changeEmail,
  changePassword,
  requestSignup,
  setError
} from '../../../Actions/Actions/Signup'

import './Signup.css'

const mapStateToProps = (state) => ({
  loading: state.signup.loading,
  email: state.signup.email,
  password: state.signup.password,
  err: state.signup.err
})

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(changeEmail(email)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestSignup: () => dispatch(requestSignup()),
  setError: (err) => dispatch(setError(err))
})

const Signup = ({
  loading, email, password, err,
  changeEmail, changePassword, requestSignup, setError
}) => {

  useEffect(() => {
    setError(false)
    return () => setError(false)
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestSignup()
  }

  const showError = () => {
    if (!err) return false
    let message
    switch (err.code) {
      // Local Error
      case 'notAgreement':
        message = '利用規約およびプライバシーポリシーへの同意が必要です'
        break
      case 'blankTextbox':
        message = '入力を確認してください'
        break
      // Server Error
      case 'blankEmail':
        message = 'ユーザ名が入力されていません'
        break
      case 'blankPassword':
        message = 'パスワードが入力されていません'
        break
      case 'alreadySignuped':
        message = '指定されたユーザ名は使えません'
        break
      case 'DBError':
        message = 'データベースエラー'
        break
      default:
        message = 'error: ' + err.code
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  const buttonLabel = loading ? '読み込み中' : '登録する'

  return (
    <div className='signup'>
      <div>
        <h2>Create New Account</h2>
        <input type='text' value={email} onChange={(e) => changeEmail(e.target.value)} onKeyPress={(e) => keyPress(e)} placeholder='Email' />
        <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} onKeyPress={(e) => keyPress(e)} placeholder='Password' />
        {showError()}
        <button onClick={() => requestSignup()} onTouchStart={() => {}}>{buttonLabel}</button>
        <div className='login-account'><Link to='/login'>Login</Link></div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)