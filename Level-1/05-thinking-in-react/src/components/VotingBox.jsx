import { use, useState } from 'react'

import VotingItem from "./VotingItem"
import VotingTable from "./VotingTable"

function VotingBox() {

    const [items, setItems] = useState([
        "Foo",
        "Bar",
        "Baz",
        "Qux"
    ])

    const [votingLines, setVotingLines] = useState([
        {
            name: "Foo",
            likes: 10,
            dislikes: 2
        },
        {
            name: "Bar",
            likes: 5,
            dislikes: 3
        }
    ])

    const handleVote = (name, type) => {
        setVotingLines(prev => {
            const newLines = [...prev]
            const lineIndex = newLines.findIndex(line => line.name === name)
            if (lineIndex === -1) {
                newLines.push({
                    name,
                    likes: type === 'like' ? 1 : 0,
                    dislikes: type === 'dislike' ? 1 : 0
                })
            } else {
                const line = newLines[lineIndex]
                if (type === 'like') {
                    line.likes += 1
                } else {
                    line.dislikes += 1
                }
            }
            return newLines
        });
    }


    return (
        <div className="card">
            <div className="card-header">Vting Box</div>
            <div className="card-body">
                <div className="d-flex flex-wrap gap-3">
                    {items.map((item, index) => (
                        <VotingItem name={item} onVote={handleVote} key={index} />
                    ))}
                </div>
                <hr />
                <VotingTable votingLines={votingLines} />
            </div>
        </div>
    )
}

export default VotingBox