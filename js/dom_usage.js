// color palette
var palette = ["#000", "#333", "#666", "#999", "#ccc", "#38aa9f", "#38dd9f", "#38aabf", "#38ddbf", "#38ddff"];

// Adds a nav with buttons
 function addNav(parent) {
   console.log("addNav");
   var nav = makeNewDiv('col-12');
   //make buttons
   var appendChildButton = makeNewButton('Append Child', appendChild, parent);
   var insertBeforeButton = makeNewButton('insert Before', insertBefore, nav);
   var replaceButton = makeNewButton('Replace', replace, nav);
   var removeChildrenButton = makeNewButton('Remove Children', removeChildren, parent);

   //add buttons to nav
   nav.appendChild(appendChildButton);
   nav.appendChild(insertBeforeButton);
   nav.appendChild(replaceButton);
   nav.appendChild(removeChildrenButton);

   parent.appendChild(nav);
 }

// returns a new button defined by params
 function makeNewButton(name, onclick, param) {
   var button = document.createElement('button');
   var text = document.createTextNode(name);
   button.appendChild(text);
   button.addEventListener("click", function(){ onclick(param); });
   button.setAttribute('class', 'col');

   return button;
 }

// returns a new div element defined by params
 function makeNewDiv(divClass, children = [], color = false) {
   var div = document.createElement('div');
   div.setAttribute('class', divClass);

   if (color) {
      var randomColor = palette[Math.floor((Math.random() * 10))]
      div.style.backgroundColor = randomColor;
   }

   children.forEach( (child) => {
      div.appendChild(child);
   });

   return div;
 }

// returns a new text element defined by params
 function makeNewText(element, nodeText, nodeClass) {
   var node = document.createElement(element);
   var text = document.createTextNode(nodeText);
   node.appendChild(text);
   node.setAttribute('class', nodeClass);

   return node;
 }

// remove all children from element
 function removeChildren(element) {
   console.log("removeChildren");
   for (var i = element.childNodes.length - 1; i >= 0; i--) {
      element.removeChild(element.childNodes[i]);
   }
 }

 // append child to element
 function appendChild(element) {
   console.log("appendChild");
   var div = makeNewDiv("row");
   addNav(div);
   element.appendChild(div);
 }

 // insert div before element
 function insertBefore(element) {
   console.log("insertBefore");
   var div = makeNewDiv("col-3", [], true);
   element.parentElement.insertBefore(div, element);
 }

 // replace element with color div
 function replace(element) {
   var div = makeNewDiv("col-3", [], true);
   element.parentElement.replaceChild(div, element);
 }
