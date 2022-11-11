export interface FoodObj {
    name: string
};

export interface FoodList {
    list: Array<FoodObj> | null
}

export interface RecipeObj {
    name: string,
    image: string
}

export interface RecipeList {
    list: Array<RecipeObj> | null
}