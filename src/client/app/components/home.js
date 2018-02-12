import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ props }) => (
    <div>
        <h2> Six Times Book Home Page </h2>
        <p><Link to="/days/">Days</Link></p>
    </div>
)

export default Home
