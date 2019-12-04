import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Base from './Base/Base'
import Auth from './Auth/Auth'
import Toast from './Toast/Toast'

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
})

const mapDispatchToProps = () => ({})

const Navigation = ({
  loading
}) => {

  const showLoading = loading ? 'loading' : false

  return (
    <React.Fragment>
      <Toast />
      {showLoading}
      <Switch>
        <Route path='/login' component={Base} />
        <Route path='/signup' component={Base} />
        <Route path='/' component={Auth} />
      </Switch>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)