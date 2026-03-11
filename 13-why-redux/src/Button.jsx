

function Button({ onClick, value }) {
    return (
        <button className="btn btn-lg btn-warning" onClick={() => onClick(value)}>
            Increment {value}
        </button>
    );
}

export default Button;