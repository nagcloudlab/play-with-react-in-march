

function VotingTable(props) {
    const { votingLines } = props
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Dislikes</th>
                </tr>
            </thead>
            <tbody>
                {votingLines.map((line, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className={line.likes > line.dislikes ? 'text-success' : line.likes < line.dislikes ? 'text-danger' : ''}>{line.name}</td>
                        <td>{line.likes}</td>
                        <td>{line.dislikes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default VotingTable