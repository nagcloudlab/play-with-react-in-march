import { useState, useReducer, useEffect, useMemo } from 'react'
import TopicList from './TopicList'
import TopicDetails from './TopicDetails'


function App() {


  const [topics, setTopics] = useState([
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "Ember",
    "Backbone",
  ])


  const [selectedTopic, setSelectedTopic] = useState(null)


  return (
    <>
      <div className='container'>
        <div className='display-1'>Two Column UI</div>
        <hr />
        <div className='row'>
          <div className='col-4'>
            <TopicList
              topics={topics}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic} />
          </div>
          <div className='col-8'>
            <TopicDetails topic={selectedTopic} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
