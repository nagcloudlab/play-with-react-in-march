


function TopicList({ topics, selectedTopic, onSelectTopic }) {
    return (
        <div className="list-group">
            {topics.map((topic) => (
                <div key={topic} className={`list-group-item ${topic === selectedTopic ? 'active' : ''}`} style={{
                    cursor: "pointer"
                }} onClick={() => onSelectTopic(topic)}>
                    <h3>{topic}</h3>
                </div>
            ))}
        </div>
    );
}

export default TopicList;