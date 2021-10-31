import React, {FC} from 'react';
import './SavedQueryList.scss';
import {SavedQuery} from "../../types";
import {Avatar, Chip} from "@material-ui/core";

interface SavedQueryListProps {
    savedQueries: SavedQuery[];
    onQueryCLicked: (savedQuery: SavedQuery) => void;
    selectedQuery: string;
}

export const SavedQueryList: FC<SavedQueryListProps> = ({savedQueries, onQueryCLicked, selectedQuery}) => {
    return (
        <div className="saved-queries">
            <h1>Saved Queries</h1>
            <div className="query-list">
                {savedQueries.map(query =>
                    <div className="chip" key={query.searchTerm}>
                        <Chip
                            onClick={() => onQueryCLicked(query)}
                            avatar={<Avatar>{query.gifs.length}</Avatar>}
                            label={query.searchTerm}
                            color={query.searchTerm === selectedQuery ? 'primary' : 'default'}
                            variant="default"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

