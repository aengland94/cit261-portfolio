var Ingredient = function(name) {
   this.name = name;
   this.crossed_off = false;
}

var Recipe = function(id, title, image_url, source_url) {
   this.id = id;
   this.title = title;
   this.image_url = image_url;
   this.source_url = source_url;

   let ingredients = [];

   this.getIngredients = function() { return ingredients; }
   this.addIngredient = function(ingredient) { ingredients.push(new Ingredient(ingredient)); }
}

export { Ingredient, Recipe };