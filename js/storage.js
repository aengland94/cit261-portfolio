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

   // hide all inputs
   for (let child = 0; child < input.childElementCount; child++) {
      input.children[child].style.display = "none";
   }
   // show selected input
   document.getElementById(document.getElementById("dataSelect").value).style.display = "block";
}

function storeData() {
   console.log("storing data");
   var value = document.getElementById("dataSelect").value;
   var storage = document.getElementById("storageSelect").value;
   var data = "";

   // populate data
   switch (value) {
      case "simple":
         data = document.getElementById("simpleInput").value;        
         break;
      case "array": 
         data = [];
         let num = document.getElementById("array").childElementCount;
         for (let i = 0; i < num; i++) {
            data.push(document.getElementById("arrayInput" + i).value);
         }
         break;
      case "associative": 
         data = {};
         data["breakfast"] = document.getElementById("associativeInputBreakfast").value;
         data["lunch"] = document.getElementById("associativeInputLunch").value;
         data["dinner"] = document.getElementById("associativeInputDinner").value;
         // stringify data for storage
         data = JSON.stringify(data);
         break;
      case "object": 
         data = {};
         data.make = document.getElementById("objectInputMake").value;
         data.model = document.getElementById("objectInputModel").value;
         data.year = document.getElementById("objectInputYear").value;
         // stringify data for storage
         data = JSON.stringify(data);
   }

   // set the selected storage variable to data
   switch(storage) {
      case "local":
         localStorage.setItem(value, data);
         break;
      case "session":
         sessionStorage.setItem(value, data);
   } 
   console.log("data: " + data);
}

function retrieveData() {
   console.log("retrieving data");
   var value = document.getElementById("dataSelect").value;
   var storage = document.getElementById("storageSelect").value;
   var data = "";
   var output = "";

   // set data to the selected storage variable
   switch(storage) {
      case "local":
         data = localStorage.getItem(value);
         break;
      case "session":
         data = sessionStorage.getItem(value);
   }
   console.log("data: " + data);

   // define output
   if (data != null) {
      switch (value) {
         case "simple":
            output = data;        
            break;
         case "array": 
            data = Array(data);
            output = "Your saved array is: " + data[0];
            for (let i = 1; i < data.length; i++) {
               output += ", " + data[i];
            }
            break;
         case "associative": 
            data = JSON.parse(data);
            output = "<strong>Your Favorite Foods</strong>";
            output += "<br/> <em>Breakfast</em>: " + data["breakfast"];
            output += "<br/> <em>Lunch</em>: " + data["lunch"];
            output += "<br/> <em>Dinner</em>: " + data["dinner"];
            break;
         case "object": 
            data = JSON.parse(data);
            output = "<strong>Your Car</strong>: " + data.make + " (<em>" + data.year + "</em>) " + data.model;
      }
   } else {
      output = "You need to store a value before you can retrieve it.";
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