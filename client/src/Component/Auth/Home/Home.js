import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Home.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Home = () => {
  return (
    <div className='home'>
      <div>
        <h2>ホーム</h2>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)