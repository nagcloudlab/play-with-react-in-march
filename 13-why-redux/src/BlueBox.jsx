import Button from "./Button"
import React from "react"

import { useSelector, useDispatch } from 'react-redux'


function BlueBox() {
    const blueCount = useSelector(state => state.blueCount)
    const dispatch = useDispatch()
    const handleClick = (value) => {
        dispatch({ type: 'BLUE_INCREMENT', payload: value })
    }
    return (
        <div className="card">
            <div className="card-body bg-primary text-white">
                <hr />
                <h1>Blue Box</h1>
                <h2>{blueCount}</h2>
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

export default BlueBox