import React, { useEffect } from 'react'
import Layout from './Layout'

const Home = () => {
    useEffect(() => {
        document.title ="Master Page"
    }, [])
    return (
        <div>
           <Layout 
                title="Home Page"
                description="Node & React ecommerce app"
                className="container"
            >
                <h2>Hello in my try to mastering the MERN STACK with Mohammed IDBRAHIM</h2>
            </Layout>
        </div>
    )
}

export default Home
