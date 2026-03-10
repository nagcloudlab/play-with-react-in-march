import ColorContext from "../contexts/ColorContext";
import C from "./C";
import { useContext } from "react";


function B() {
    let color = useContext(ColorContext).color || "black";
    return (
        <div className="card">
            <div className="card-body">
                <h1>B - {color}</h1>
                <C />
            </div>
        </div>
    );
}

export default B;