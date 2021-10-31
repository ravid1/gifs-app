import React, {FC} from 'react';
import './GifGallery.scss';
import {GifItem} from '../GifItem/GifItem';
import {Gif} from "../../types";

interface GifGalleryProps {
    onGifClicked: (gif: Gif) => void;
    gifs: Gif[];
}

export const GifGallery: FC<GifGalleryProps> = ({gifs, onGifClicked}) => {
    return (
        <div className="gif-gallery">
            {gifs.map(gif =>
                <div className="gif-item-container" key={gif.id}>
                    <GifItem onGifClicked={onGifClicked}
                             gif={gif}/>
                </div>
            )}
        </div>
    );
}

