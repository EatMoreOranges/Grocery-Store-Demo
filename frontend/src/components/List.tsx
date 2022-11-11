import ListItem from './ListItem';
import React from 'react';
import { FoodList, FoodObj } from '../../types';

interface Props {
    list: FoodList | null,
    updateFunc: any | null
}

export default function List({list, updateFunc}: Props) {

    return (
        <div className="col">
            <ul>
                {
                    list?.list?.map((food: FoodObj, idx: any) => <ListItem item={food} updateFunc={updateFunc} />)
                }
            </ul>
        </div>
    );
}
