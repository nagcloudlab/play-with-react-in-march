import logo from './logo.svg';
import './App.css';


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


function App() {
  return (
    <div className="App">
      <ClockBoard />
    </div>
  );
}

export default App;
