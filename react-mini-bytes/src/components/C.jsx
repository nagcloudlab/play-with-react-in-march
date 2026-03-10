import { useContext } from "react";
import ColorContext from "../contexts/ColorContext";


function C() {
    let color = useContext(ColorContext).color || "black";
    return (
        <div className="card">
            <div className="card-body">
                <h1>C - {color}</h1>
            </div>
        </div>
    );
}

export default C;