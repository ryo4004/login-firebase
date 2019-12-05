import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestLogout } from '../../../Actions/Actions/Session'

import './Home.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})

const Home = ({
  requestLogout
}) => {
  return (
    <div className='home'>
      <div>
        <h2>ホーム</h2>
        <button onClick={() => {requestLogout()}}>ログアウト</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)