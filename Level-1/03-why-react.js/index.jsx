

// using DOM API + Timer Api
//-------------------------------

const asia_kolkata_clock_element = document.getElementById("asia-kolkata-clock");
const asia_dubai_clock_element = document.getElementById("asia-dubai-clock");
const america_newyork_clock_element = document.getElementById("america-newyork-clock");


//-----------------------------------------------
// UI component - Clock
//-----------------------------------------------

// jsx -> proposed by facebook -> not a part of js -> transpiled to js by babel

function Clock(props) {
    let { timeZone } = props;
    return (
        <div className="card">
            <h5 className="card-header">{timeZone}</h5>
            <div className="card-body">
                <span id={`${timeZone}-clock-time`} className="bg-warning p-2 rounded">
                    {new Date().toLocaleTimeString("en-US", { timeZone })}
                </span>
            </div>
        </div>
    );
}

function ClockBoard() {
    return (
        <div className="row">
            <div className="col-4">
                <Clock timeZone="Asia/Kolkata" />
            </div>
            <div className="col-4">
                <Clock timeZone="Asia/Dubai" />
            </div>
            <div className="col-4">
                <Clock timeZone="America/New_York" />
            </div>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("clock-board"));

setInterval(() => {
    root.render(React.createElement(ClockBoard));
}, 1000);

