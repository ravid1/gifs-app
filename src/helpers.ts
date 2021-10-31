import axios from "axios";

export async function getGifs(searchTerm: string) {
    const params = {
        api_key: 'NVEUpFk1mrG5H3u96OQ22C85H09zO7d7',
        q: searchTerm
    };
    return axios('https://api.giphy.com/v1/gifs/search', {params});
}

export function getFrontEndModel(serverData: any) {
    return ({
        url: serverData.images.downsized.url,
        id: serverData.id
    });
}

export function getItemFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null
}

export function setItemForLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}