import {Action, ReducerState} from "../types";
import {getItemFromLocalStorage, setItemForLocalStorage} from "../helpers";
import {ADD_GIFS, GIFS_KEY, REMOVE_GIF, SAVE_GIF, SAVED_QUERIES_KEY} from "../constants";

export const initialState = {
    gifs: getItemFromLocalStorage(GIFS_KEY) || [],
    savedQueries: getItemFromLocalStorage(SAVED_QUERIES_KEY) || []
};

export function gifsReducer(draft: ReducerState, action: Action) {
    switch (action.type) {
        case ADD_GIFS:
            draft.gifs = action.payload
            break;
        case SAVE_GIF: {
            const {gif, searchTerm} = action.payload;
            const savedItem = draft.savedQueries.find(savedQuery => savedQuery.searchTerm === searchTerm);
            if (savedItem) {
                const isGifSaved = savedItem.gifs.find(savedGif => savedGif.id === gif.id);
                if (!isGifSaved) {
                    savedItem.gifs.push(gif);
                }
            }
            else {
            const newSavedObj = {searchTerm: searchTerm, gifs: [gif]};
            draft.savedQueries.push(newSavedObj)
            }
            break;
        }
        case REMOVE_GIF: {
            const {gif, selectedQuery} = action.payload;
            const queryIndex = draft.savedQueries.findIndex(savedQuery => savedQuery.searchTerm === selectedQuery);
            if (queryIndex > -1) {
                const newSavedGifs = draft.savedQueries[queryIndex].gifs.filter(savedGif => savedGif.id !== gif.id);
                if (newSavedGifs.length) {
                    draft.savedQueries[queryIndex].gifs = newSavedGifs;
                    const gifIndex = draft.gifs.findIndex(currentGif => currentGif.id === gif.id);
                    draft.gifs.splice(gifIndex, 1);
                } else {
                    draft.savedQueries.splice(queryIndex, 1);
                    draft.gifs = [];
                }
            }
            break;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
    setItemForLocalStorage(SAVED_QUERIES_KEY, draft.savedQueries);
    setItemForLocalStorage(GIFS_KEY, draft.gifs);
    return draft;
}
