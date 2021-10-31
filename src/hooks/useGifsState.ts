import {useEffect, useRef, useState} from "react";
import {Gif, SavedQuery} from "../types";
import {getFrontEndModel, getGifs, getItemFromLocalStorage, setItemForLocalStorage} from "../helpers";
import {useImmerReducer} from "use-immer";
import {gifsReducer, initialState} from "./reducer";
import {useDebounce} from "use-debounce";
import {
    ADD_GIFS,
    DEBOUNCE_TIME,
    REMOVE_GIF,
    SAVE_GIF,
    SEARCH_TERM_KEY,
    SELECTED_QUERY_KEY
} from "../constants";

export function useGifsState() {
    const [{gifs, savedQueries}, dispatch] = useImmerReducer(gifsReducer, initialState);
    const [searchValue, setSearchValue] = useState(getItemFromLocalStorage(SEARCH_TERM_KEY) || '');
    const [debouncedSearchValue] = useDebounce(searchValue, DEBOUNCE_TIME);
    const [selectedQuery, setSelectedQuery] = useState(getItemFromLocalStorage(SELECTED_QUERY_KEY) || '');
    const isMounted = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getGifs(debouncedSearchValue);
                const newGifs = res.data.data.slice(0, 5).map(getFrontEndModel);
                dispatch({
                    type: ADD_GIFS,
                    payload: newGifs
                });
                setSelectedQuery('');
            } catch (e) {
                alert(e);
            }
        }
        isMounted.current && fetchData();
    }, [debouncedSearchValue, dispatch])

    useEffect(() => {
        setTimeout(() => {
            isMounted.current = true;
        }, DEBOUNCE_TIME);
    }, [])

    useEffect(() => {
        setItemForLocalStorage(SELECTED_QUERY_KEY, selectedQuery);
    }, [selectedQuery])

    useEffect(() => {
        setItemForLocalStorage(SEARCH_TERM_KEY, debouncedSearchValue);
    }, [debouncedSearchValue])

    const onGifClicked = (clickedGif: Gif) => {
        if (selectedQuery) {
            dispatch({
                type: REMOVE_GIF,
                payload: {
                    gif: clickedGif,
                    selectedQuery: selectedQuery
                }
            });
        } else {
            dispatch({
                type: SAVE_GIF,
                payload: {
                    gif: clickedGif,
                    searchTerm: debouncedSearchValue
                }
            });
        }
    };

    const onQueryCLicked = (savedQuery: SavedQuery) => {
        dispatch({
            type: ADD_GIFS,
            payload: savedQuery.gifs
        });
        setSelectedQuery(savedQuery.searchTerm);
    };

    return {
        gifs,
        searchValue,
        onSearchValueChange: (val: string) => setSearchValue(val),
        onGifClicked,
        savedQueries,
        onQueryCLicked,
        selectedQuery
    };
}