export default function StatsSkeleton() {

    return (
        <div className="row">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="placeholder-glow">
                                <span className="placeholder col-6 mb-2"></span>
                                <span className="placeholder col-4 placeholder-lg"></span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}