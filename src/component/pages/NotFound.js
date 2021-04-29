import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Fragment>
            <div className="m-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Undifiened page</h4>
                    <hr/>
                    <p className="mb-0">
                        <Link to="/">Back to main</Link>
                    </p>
                </div>
            </div>
            
        </Fragment>
    )
}

export default NotFound
