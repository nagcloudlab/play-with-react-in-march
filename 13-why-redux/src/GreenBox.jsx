import Button from "./Button"
import React from "react"

import { useSelector, useDispatch } from 'react-redux'

function GreenBox() {
    const greenCount = useSelector(state => state.greenCount)
    const dispatch = useDispatch()
    const handleClick = (value) => {
        dispatch({ type: 'GREEN_INCREMENT', payload: value })
    }
    return (
        <div className="card">
            <div className="card-body bg-success text-white">
                <hr />
                <h1>Green Box</h1>
                <h2>{greenCount}</h2>
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

export default GreenBox