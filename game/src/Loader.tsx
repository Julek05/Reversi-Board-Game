import React, {FunctionComponent} from "react";
import {BeatLoader} from "react-spinners";

export const Loader: FunctionComponent = () => {
    return (
        <div id='loader'>
            <BeatLoader
                size={45}
                color='green'
                loading
            />
        </div>
    );
}
