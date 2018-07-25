import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe : Recipe;

  ngOnInit() {
  }

  onSelectedRecipeChanged(newSelectedRecipe : Recipe){
    console.log('Clicked on recipe with name '+newSelectedRecipe.name)
    this.selectedRecipe = newSelectedRecipe;
  }

}
