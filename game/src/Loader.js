import React from "react";
import {BeatLoader} from "react-spinners";

function Loader() {
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

export default Loader;