import React, {FC} from 'react';
import './GifItem.scss';
import {Gif} from "../../types";

interface GifItemProps {
    gif: Gif;
    onGifClicked: (gif: Gif) => void;
}

export const GifItem :FC<GifItemProps> = ({gif, onGifClicked})=> {
    return (
        <div className="gif-item" onClick={() => onGifClicked(gif)}>
            <img src={gif.url} alt="gif"/>
        </div>
    );
}

