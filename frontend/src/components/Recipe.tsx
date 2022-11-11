import React from "react";
import { RecipeObj } from "../../types";

interface Props {
    recipe: RecipeObj | null,
}

export default function Recipe({recipe}: Props) {

    return (
        <div className="col">
            {recipe?.name}
            <img src={recipe?.image} alt={recipe?.name} />
        </div>
    );
}
