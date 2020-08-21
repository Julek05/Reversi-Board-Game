import React from "react";

function Field({value, onClick}) {
    return (
        <button className="field" onClick={onClick}>
            {value}
        </button>
    )
}

export default Field;