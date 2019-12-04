import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestAuth } from '../../Actions/Actions/Authentication'

import Home from './Home/Home'

import './Auth.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestAuth: () => dispatch(requestAuth()),
  requestStatus: () => dispatch(requestStatus())
})

const Auth = ({
  requestAuth
}) => {

  useEffect(() => {
    requestAuth()
  }, [])

  return (
    <React.Fragment>
      <div className='auth'>
        <Switch>
          <Route path='/home' component={Home} />
        </Switch>
      </div>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)