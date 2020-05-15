import React from 'react';
import {useParams} from "react-router-dom";

function Screen() {
    const { imagePath } = useParams();
    return (
        <div>
            <img height='540' width='480' src={`${getImgPath(imagePath)}`} alt=''/>
        </div>
    );
}

function getImgPath(imagePath) {
    return 'http://localhost:8000/uploads/photos/' + imagePath;
}

export default Screen