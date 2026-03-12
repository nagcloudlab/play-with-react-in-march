import Button from "./Button"
import React from "react"

import { useSelector, useDispatch } from 'react-redux'


function RedBox() {
    const redCount = useSelector(state => state.redCount)
    const dispatch = useDispatch()
    const handleClick = (value) => {
        dispatch({ type: 'RED_INCREMENT', payload: value })
    }
    return (
        <div className="card">
            <div className="card-body bg-danger text-white">
                <hr />
                <h1>Red Box</h1>
                <h2>{redCount}</h2>
                <hr />
                <div className="d-flex justify-content-around">
                    <Button
                        value={10}
                        onClick={handleClick}
                    />
                    <Button
                        value={20}
                        onClick={handleClick}
                    />
                    <Button
                        value={30}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default RedBox