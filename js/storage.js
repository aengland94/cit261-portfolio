// set listeners on load
function setListeners() {
   console.log("setting listeners");
   document.getElementById("dataSelect").onchange = changeInputDisplay;
   document.getElementById("storeButton").onclick = storeData;
   document.getElementById("retrieveButton").onclick = retrieveData;
   document.getElementById("removeButton").onclick = removeData;

   changeInputDisplay();
};

function changeInputDisplay() {
   console.log("changing input display");
   var input = document.getElementById("in");

   for (let child = 0; child < input.childElementCount; child++) {
      input.children[child].style.display = "none";
   }
   document.getElementById(document.getElementById("dataSelect").value).style.display = "block";
}

function storeData() {
   console.log("storing data");
   var value = document.getElementById("dataSelect").value;
   var storage = document.getElementById("storageSelect").value;
   var data = "";

   switch (value) {
      case "simple":
         data = document.getElementById("simpleInput").value;
         switch(storage) {
            case "local":
               localStorage.simple = data;
               break;
            case "session":
               sessionStorage.simple = data;
               break;
         }         
         break;
      case "array": 
         data = [];
         let num = document.getElementById("array").childElementCount;
         for (let i = 0; i < num; i++) {
            data.push(document.getElementById("arrayInput" + i).value);
         }
         switch(storage) {
            case "local":
               localStorage.array = data;
               break;
            case "session":
               sessionStorage.array = data;
               break;
         }
         break;
      case "associative": 
         data = {};
         data["breakfast"] = document.getElementById("associativeInputBreakfast").value;
         data["lunch"] = document.getElementById("associativeInputLunch").value;
         data["dinner"] = document.getElementById("associativeInputDinner").value;
         switch(storage) {
            case "local":
               localStorage.associative = data;
               break;
            case "session":
               sessionStorage.associative = data;
               break;
         }
         break;
      case "object": 
         data = {};
         data.make = document.getElementById("objectInputMake").value;
         data.model = document.getElementById("objectInputModel").value;
         data.year = document.getElementById("objectInputYear").value;
         console.log("data: " + data);
         switch(storage) {
            case "local":
               localStorage.object = data;
               break;
            case "session":
               sessionStorage.object = data;
               break;
         }
         break;
   }
   console.log("data: " + data);
}

function retrieveData() {
   console.log("retrieving data");
   var value = document.getElementById("dataSelect").value;
   var storage = document.getElementById("storageSelect").value;
   var data = "";
   var output = "";

   switch (value) {
      case "simple":
         switch(storage) {
            case "local":
               data = localStorage.simple;
            case "session":
               data = sessionStorage.simple;
         } 
         output = data;        
         break;
      case "array": 
         switch(storage) {
            case "local":
               data = localStorage.array;
            case "session":
               data = sessionStorage.array;
         }
         output = "Your saved array is: " + data[0];
         for (let i = 1; i < data.length; i++) {
            output += ", " + data[i];
         }
         break;
      case "associative": 
         data = {};
         data["breakfast"] = document.getElementById("associativeInputBreakfast").value;
         data["lunch"] = document.getElementById("associativeInputLunch").value;
         data["dinner"] = document.getElementById("associativeInputDinner").value;
         switch(storage) {
            case "local":
               data = localStorage.associative;
            case "session":
               data = sessionStorage.associative;
         }
         output = "<em>Your Favorite Foods</em>";
         output += "<br/> Breakfast: " + data["breakfast"];
         output += "<br/> Lunch: " + data["lunch"];
         output += "<br/> Dinner: " + data["dinner"];
         break;
      case "object": 
         switch(storage) {
            case "local":
               data = localStorage.object;
            case "session":
               data = sessionStorage.object;
         }
         output = "Your Car: " + data.make + " (" + data.year + ") " + data.model;
   }
   document.getElementById("out").innerHTML = output;
   console.log("output: " + output);
}

function removeData() {
   console.log("removing data");
   var value = document.getElementById("dataSelect").value;
   var storage = document.getElementById("storageSelect").value;

   switch (storage) {
      case "local":
         localStorage.removeItem(value);
         break;
      case "session":
         sessionStorage.removeItem(value);
   }   
}