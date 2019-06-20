var petTypes, addPetButton, petsList;

var Pet = function() {
   this.name = "";
   this.sound = "";
   this.move  = "";
}

Pet.prototype.display = function() {
   return this.sound + "! My name is " + this.name + ". I move by " + this.move + ".";
}

var Cat = function(name) {
   this.name = name ? name : "";
   this.sound = "Meow";
   this.move = "walking";
}

var Bird = function(name) {
   this.name = name ? name : "";
   this.sound = "Chirp";
   this.move = "flying";
}

var Bunny = function(name) {
   this.name = name ? name : "";
   this.sound = "Stare of cuteness";
   this.move = "hopping";
}

var Fish = function(name) {
   this.name = name ? name : "";
   this.sound = "Glub glub";
   this.move = "swimming";
}

Cat.prototype = Object.create(Pet.prototype);
Bird.prototype = Object.create(Pet.prototype);
Bunny.prototype = Object.create(Pet.prototype);
Fish.prototype = Object.create(Pet.prototype);

function init() {
   petTypes = document.getElementsByName("petType");
   petsList = document.getElementById("petsList");
   addPetButton = document.getElementById("petButton");
   addPetButton.onclick = addPet;
}

function addPet() {
   let petType, p, i = 0, name = document.getElementById("petName").value;

   while(!petType || i < petTypes.length) {
      if (petTypes[i].checked) {
         petType = petTypes[i].value;
      }
      i++;
   }
   switch (petType) {
      case "cat":
         p = new Cat(name);
         break;
      case "bird":
         p = new Bird(name);
         break;
      case "bunny":
         p = new Bunny(name);
         break;
      case "fish":
         p = new Fish(name);
         break;
      default:
         p = new Pet();
         break;
   }

   console.log(p.display());

   let li = document.createElement('li');
   let text = document.createTextNode(p.display());
   li.appendChild(text);
   petsList.appendChild(li);
}