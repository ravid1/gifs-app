
export interface Gif {
    url: string;
    id: string;
}

export interface SavedQuery {
    searchTerm: string,
    gifs: Gif[]
}

export interface ReducerState {
    gifs: Gif[],
    savedQueries: SavedQuery[]
}

export interface Action {
    type: string;
    payload: any
}