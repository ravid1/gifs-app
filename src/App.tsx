import React from 'react';
import './App.scss';
import {useGifsState} from "./hooks/useGifsState";
import {TextField} from "@material-ui/core";
import {GifGallery} from "./components/GifGallery/GifGallery";
import {SavedQueryList} from "./components/SavedQueryList/SavedQueryList";

function App() {
    const {
        gifs,
        searchValue,
        onSearchValueChange,
        onGifClicked,
        savedQueries,
        onQueryCLicked,
        selectedQuery
    } = useGifsState();

    return (
        <div className="app-container">
            <div className="text-field-wrapper">
                <TextField
                    value={searchValue}
                    onChange={(e) => onSearchValueChange(e.target.value)}
                    variant="outlined"
                    label="Search Gif"
                    type="search"/>
            </div>
            <GifGallery gifs={gifs}
                        onGifClicked={onGifClicked}/>
            <SavedQueryList savedQueries={savedQueries}
                            selectedQuery={selectedQuery}
                            onQueryCLicked={onQueryCLicked}/>
        </div>
    );
}

export default App;
