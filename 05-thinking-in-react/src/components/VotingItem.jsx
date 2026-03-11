
function VotingItem(props) {
    let { name, onVote } = props

    const handleVote = (type) => {
        onVote(name, type)
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="display-4">{name}</div>
                <div className="d-flex">
                    <button onClick={() => handleVote('like')} className="btn btn-primary">Like</button>
                    <button onClick={() => handleVote('dislike')} className="btn btn-secondary">Dislike</button>
                </div>
            </div>
        </div>
    )
}

export default VotingItem