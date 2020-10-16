import React, {FunctionComponent} from "react";
import Utils from "./Utils";

interface FieldProps {
    value: number
    onClick: () => void
}

export const Field: FunctionComponent<FieldProps> = ({value, onClick}) => {
    return (
        <button className="field" onClick={onClick}>
            {<img src={Utils.getImgPath(value)} className='disk' alt=""/>}
        </button>
    )
}