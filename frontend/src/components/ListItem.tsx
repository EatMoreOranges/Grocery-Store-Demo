import React from 'react';
import { FoodObj } from '../../types';

interface Props {
    item: FoodObj,
    updateFunc(ingredient: FoodObj): any | null
}

export default function ListItem({ item, updateFunc }: Props) {
    
    return (
        <li className="card" onClick={() => { updateFunc(item) }}>
            { item.name }
        </li>
    );
}
