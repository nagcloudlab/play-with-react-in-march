import React from 'react'
import RedBox from './RedBox'
import GreenBox from './GreenBox'
import BlueBox from './BlueBox'

import { useSelector } from 'react-redux'

function App() {

  const [color, setColor] = React.useState('red')
  const totalCount = useSelector(state => state.redCount + state.greenCount + state.blueCount)

  return (
    <>
      <div className='container'>
        <div className='display-1'>
          Why External State Management Library? e.g Redux
        </div>
        <hr />
        <div className='d-flex justify-content-around'>
          <button className='btn btn-danger' onClick={() => setColor('red')}>Red</button>
          <button className='btn btn-success' onClick={() => setColor('green')}>Green</button>
          <button className='btn btn-primary' onClick={() => setColor('blue')}>Blue</button>
        </div>
        <hr />
        <div className='display-4'>
          Total Count: {totalCount}
        </div>
        <hr />
        {color === 'red' && <RedBox />}
        {color === 'green' && <GreenBox />}
        {color === 'blue' && <BlueBox />}

      </div>
    </>
  )
}

export default App
