
import { useState, useReducer, useEffect, useMemo, use } from 'react'


const mockedData = {
    "React": "React is a JavaScript library for building user interfaces.",
    "Vue": "Vue is a progressive JavaScript framework for building user interfaces.",
    "Angular": "Angular is a platform for building mobile and desktop web applications.",
    "Svelte": "Svelte is a radical new approach to building user interfaces.",
    "Ember": "Ember is a framework for ambitious web developers.",
    "Backbone": "Backbone.js gives structure to web applications by providing models with key-value binding and custom events."
}

function TopicDetails({ topic }) {

    const [topicDetails, setTopicDetails] = useState(null)

    useEffect(() => {
        // api call to fetch topic details
        mockedData[topic] && setTopicDetails(mockedData[topic])
    }, [topic])

    return (
        <div className="topic-details">
            {topicDetails}
        </div>
    );
}

export default TopicDetails;