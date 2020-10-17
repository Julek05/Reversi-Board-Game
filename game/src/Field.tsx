import React, {FunctionComponent} from "react";

interface FieldProps {
    value: JSX.Element
    onClick: () => void
}

export const Field: FunctionComponent<FieldProps> = ({value, onClick}) => {
    return (
        <button className="field" onClick={onClick}>
            {value}
        </button>
    )
}