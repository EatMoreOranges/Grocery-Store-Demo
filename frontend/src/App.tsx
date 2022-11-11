import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AddModal from './components/AddFood';
import List from './components/List';
import Recipe from './components/Recipe';
import { FoodList, RecipeList, FoodObj, RecipeObj } from '../types';

function App() {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [foodList, setFoodList] = useState<FoodList | null>(null);
  const [recipeList, setRecipeList] = useState<RecipeList | null>(null);
  const [currFood, setCurrFood] = React.useState<FoodObj | null>(null);
  const [currRecipe, setCurrRecipe] = React.useState<RecipeObj | null>(null);
  
  function onModalOpen(){
    setAddModalIsOpen(true);
    console.log('Opening modal');
  }

  function onModalClose(){
    setAddModalIsOpen(false);
    console.log('Closing modal');
  }

  function onAdd(foodName: string){
    fetch('http://localhost:8000/add',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name":foodName,
            "id":"000"
        }),
    })
    .then(data => {
        console.log('Success', data)
        fetchFoodList()
    })
    .catch((error) => {
        console.error('Error',error);
    });
    setAddModalIsOpen(false);
  }

  async function fetchFoodList() {
    console.log("about to fetch some food...");
    const response = await fetch('http://localhost:8000/groceries', {
        method:'GET',
        headers: {
            'accept': 'application/json',
        }
    });
    console.log("got some food...", response);
    const newList: FoodObj[] = await response.json();
    console.log('newList', newList);
    const newFoodList: FoodList = {
        list: newList
    }
    
    setFoodList(newFoodList);
    console.log('foodList', foodList);
  }

  async function fetchRecipeList(ingredient: FoodObj) {
    
    const response = await fetch('http://localhost:8000/recipes?' + new URLSearchParams({
        'item': ingredient.name
    }), {
      method:'GET',
      headers: {
        'accept': 'application/json',
      }
    });
    const newList = await response.json();
    let newArray: RecipeObj[] = [];

    newList?.forEach((item: any) => {
      let newItem: RecipeObj = {
        name: item.title,
        image: item.image
      };

      newArray.push(newItem);
    });
    
    const newRecipeList: RecipeList = {
      list: newArray
    }
    
    setRecipeList(newRecipeList);
    setCurrFood(ingredient);
    console.log('recipeList', recipeList);
  }

  React.useEffect(() => {
    fetchFoodList();
  }, []);


  return (
    <div className="App">
      <h1>My Grocery List</h1>
      <button className='btn' onClick={onModalOpen}>Add Item</button>
      {addModalIsOpen && <AddModal onClose={onModalClose} onAdd={onAdd}/>}
      <div className="row">
          <List list={foodList} updateFunc={fetchRecipeList}/>
          <List list={recipeList} updateFunc={setCurrRecipe}/>
          <Recipe recipe={currRecipe} />
      </div>
    </div>

  );
}

export default App;
