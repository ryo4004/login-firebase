import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestAuthentication } from '../../Actions/Actions/Session'

import Home from './Home/Home'

import './Auth.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestAuthentication: () => dispatch(requestAuthentication())
})

const Auth = ({
  requestAuthentication
}) => {

  useEffect(() => {
    requestAuthentication()
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