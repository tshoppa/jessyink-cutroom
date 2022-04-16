//IE11 polyfills ->
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
// <- IE11 polyfills

function downloadFile(filename, content) {
  if (navigator.msSaveBlob)
    navigator.msSaveBlob(
      new Blob([content], { type: "text/csv;charset=utf-8;" }),
      filename
    );
  else {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

var helpVisible = false;
document.getElementById("helpButton").addEventListener("click", function(e){
    setHelpVisible(!helpVisible);
    e.stopPropagation();
});

function setHelpVisible(visible){
    if(visible != helpVisible){
        helpVisible = visible;
        const helpContainer = document.querySelectorAll(".hasHelp");
        for(var i = 0; i< helpContainer.length;i++){
            helpContainer[i].classList.toggle("showHelp");
        }
        document.getElementById("helpButton").classList.toggle("active");
    }
}

document.getElementById("download").addEventListener("click", download);
function download() {
    // discard while help is shown
    if(helpVisible) return;
    
    //make copy to remove presentationLayer
    const docToSave = importDoc.cloneNode(true);
    const presentationLayer = docToSave.getElementById("jessyink_presentation_layer");
    presentationLayer.remove();
    const serializer = new XMLSerializer();
    const content = serializer.serializeToString(docToSave);

    downloadFile(fileName, content);
}

function frameChanged(){
    // hash changed, get the url and sync to selection
        const previewWindow = importDoc.defaultView;
        const hash = previewWindow.location.hash;
        const split = hash.indexOf("_");
        const l = hash.substring(1,split);
        const s = hash.substring(split+1, hash.length);
        
        updateSelection(l,s);
}


function updatePreview(){
    const viewWindow = importDoc.defaultView;
    viewWindow.location.hash = currentLayer.index+"_"+currentOrder.index;
    viewWindow.jessyInkInitialised=false;
    viewWindow.jessyInkInit();
    
    //previewReload (currentLayer.index, currentOrder.index);
/*
    const oldUrl = url;
    const content = new XMLSerializer().serializeToString(importDoc);
    blob = new Blob([content], { type: "image/svg+xml" });
    url = URL.createObjectURL(blob)+ '#' + currentLayer.index + '_' + currentOrder.index;
    const viewer = document.getElementById("viewer");
    viewer.src = url;
    if(oldUrl) URL.revokeObjectURL(oldUrl);
 */
}

function logError(error) {
  console.log(error); // also add in error log later
}


function isBeforeElement(elem1, elem2){
    var e = elem1;
    do {
        if( e.nextElementSibling == elem2) return true;
        e = e.nextElementSibling;
    } while (e != null)
    return false;
}

function findClass(parentClass, element){
    var e = element;
    while(e!= null){
        if(e.classList.contains(parentClass))return e;
        e = e.parentElement;
    }
    return null;
}

function initDragAndDrop(){
    
    var current = null;
    var parentOrder = null; //draggedOrder
    var dragTarget = null;
    var dragType = "nothing";
    var lastDropTarget = null;
        
    function getDragType(target){
        if(target.classList.contains("order")){
            return "order";
        } else if (target.classList.contains("part")) {
            if(target.classList.contains("view")) return "view"
            else return "effect";
        }
        return "nothing";
    }
    
    document.addEventListener("dragstart", function( event ) {
      dragType = getDragType(event.target);
      
      if( dragType){
        current = event.target;
        current.classList.add("dragged");
        parentOrder = findClass("order", current);
        lastDropTarget = parentOrder;
      }
  }, false);

  document.addEventListener("dragend", function( event ) {
      //document.getElementById("expander").classList.remove("onTween");
      if( current) {
          current.classList.remove("dragged");
          current = null;
          parentOrder = null;
          if(dragTarget) dragTarget.classList.remove("dragover");
          dragTarget = null;
          dragType = "nothing";
          lastDropTarget = null;
      }
  }, false);

  document.addEventListener("dragover", function( event ) {
      if( current) {
        event.preventDefault();
      }
  }, false);

  document.addEventListener("dragenter", function( event ) {
      dragTarget = null;
      if(event.target.classList.contains ("tween")){
        event.target.classList.add("dragover");
        
        //if(isBeforeElement(event.target, lastDropTarget)) document.getElementById("expander").classList.add("onTween");
        dragTarget = event.target;
      } else if(dragType != "order"){
          var order = findClass("order", event.target)
          if( order && order != parentOrder){
            if( dragType == "view"){
                // check, if already has a view
                if( order.getElementsByClassName("view").length > 0)return;
            } else {
                const model = layers[currentLayer.id];
                if (Object.keys(model[order.modelIndex]).includes(current.modelId)) return; //has an effect with same id
            }
            order.classList.add("dragover");
            dragTarget = order;
          }
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      if(event.target.classList.contains ("tween")){
        event.target.classList.remove("dragover");
        lastDropTarget = event.target;
        //document.getElementById("expander").classList.remove("onTween");
      } else {
          var order = findClass("order", event.target)
          lastDropTarget = order;
          if( order && order != parentOrder && order != dragTarget){
            order.classList.remove("dragover");
          }
      }
  }, false);
  
  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  document.addEventListener("drop", function( event ) {
    //document.getElementById("expander").classList.remove("onTween");
    const model = layers[currentLayer.id];
    
    function moveModelOrder(from, to){
            if( to < from ){ 
                arraymove(model, from, to);
                return to;
            } else if (to > from +1){
                arraymove(model, from, to-1);
                return to-1;
            } else return from;
      }
      
      function moveSteptoNewModelOrder(to, from, stepId){
          const step = model[from][stepId];
          delete model[from][stepId];
          const order = {};
          order[stepId] = step;
          model.splice(to,0,order);
          return to;
      }

       function moveStepToModelOrder(from, to, stepId){
          const step = model[from][stepId];
          delete model[from][stepId];
          model[to][stepId] = step;
          if(Object.keys(model[from]).length == 0){
              model.splice(from,1);
              return (to > from) ? to-1 : to;
          } else return to;
       }

      if( current) {
          event.preventDefault();
          if( dragTarget){
            newSelectionIndex = 0;
            if( dragTarget.classList.contains("tween")){
                // move to new position
                if(dragType == "order"){
                    newSelectionIndex = moveModelOrder(current.modelIndex, dragTarget.modelIndex);
                    if(newSelectionIndex == current.modelIndex) return;
                } else {    //step dragged
                    if(Object.keys(model[current.modelIndex]).length == 1) {
                        //only one element, so also just move order
                        newSelectionIndex = moveModelOrder(current.modelIndex, dragTarget.modelIndex);
                        if(newSelectionIndex == current.modelIndex) return;
                    } else {
                        newSelectionIndex = moveSteptoNewModelOrder(dragTarget.modelIndex, current.modelIndex, current.modelId);
                    }
                }
            } else { // dragtarget is an order
                newSelectionIndex = moveStepToModelOrder(current.modelIndex, dragTarget.modelIndex, current.modelId);
            }
            
            layers[currentLayer.id] = reorderModel(model);
            updateModelView();
            selectOrder( getOrderAtStep(newSelectionIndex));
            updateDoc();
            updatePreview();
          } else console.log ("no drag target")
      }
        
  }, false);
}


initDragAndDrop();

//for highlighting
var partCache = {};

function highlight(id){
    const effectElement = importDoc.getElementById(id);
    if( effectElement){
        partCache.view = effectElement.parentElement;
        partCache.opacity = partCache.view.getAttribute("opacity");
        partCache.style = partCache.view.getAttribute("style");
        partCache.view.setAttribute("opacity", "0.5");
        partCache.view.setAttribute("style", "display:inherit;");
    }
}

function removeHighlight(){
    if(partCache.view){
        partCache.view.setAttribute("opacity", partCache.opacity);
        partCache.view.setAttribute("style", partCache.style);
        partCache = {};
    }
}

function updateModelView(){
    const view = document.getElementById("model");
    view.replaceChildren(); //clear View    
            
    function createPartView(part, modelIndex){
                
                const partView = document.getElementById("template"+part.type).cloneNode(true); //true for deep clone
                partView.draggable="true";
                partView.removeAttribute("id");

                const label = (part.label ? part.label : part.id);
                const labelCont = partView.querySelector(".label");
                labelCont.textContent = label;
//                partView.appendChild(document.createTextNode(part.type + " " + label));
                partView.modelIndex = modelIndex;
                partView.modelId = part.id;
                
                if(part.type != "view"){
                    partView.addEventListener("mouseover", function(e){
                            const p = findClass("part", e.target);
                            if(p != partCache.part){
                                partCache.part = p;
                                const id = p.modelId + "_" + (currentLayer.index-1);
                                highlight(id);
                            }
                    });
                    partView.addEventListener("mouseout", function(e){
                        const p = findClass("part", e.target);
                        if(!p.contains(e.relatedTarget)){
                            removeHighlight();
                        }
                    });
                }
                return partView;
    }
    
    function createStepView(step, index){
        const entry = document.createElement("ul");
        entry.classList.add("step");
        const orderNo = document.createElement("li");
        orderNo.classList.add("orderNo");
        orderNo.appendChild(document.createTextNode(index));
        entry.appendChild(orderNo);

        for (var key in step) {
            if (step.hasOwnProperty(key)) {
                const part = step[key];
                entry.appendChild(createPartView(part, index));
            }
        }
        return entry;
    }
    
    function createOrderView(index){
        const order = document.createElement("li");
        order.setAttribute("id", "order_"+index);
        order.classList.add("order");
        order.draggable = true;
        order.modelIndex = index;
        order.addEventListener("click", orderClicked);

        return order;
    }

    function createTween(index){
        const tween = document.createElement("li");
        tween.classList.add("tween");
        tween.modelIndex = index;
        return tween;
    }

        
    view.appendChild(createTween(0));
    const model = layers[currentLayer.id];
    model.forEach(function(val, index){
        const order = createOrderView(index);
        order.appendChild(createStepView(val, index));
        view.appendChild(order);
        view.appendChild(createTween(index+1));
    });
    currentOrder = {};
}

var layers = {};
var importDoc;
var fileName;

/**
 * update doc according to model changes
 */
function updateDoc(){
    
    function stepToAtrValue(step){
        return "name:"+step.name+";order:" + step.order + ";length:" + step.length;
    }
        
    function stepToAtrKey(step){        
        return "ns1:" + step.type;
    }
            
    const layer = importDoc.querySelector('[id= "' + currentLayer.id + '"]');
    const model = layers[currentLayer.id];
    const orders = model.keys();
    
    for (const order of orders) {
        var steps = Object.keys(model[order]);
        for( const stepId of steps){
            const selector = '[id= "' + stepId + '"]';
            const step = model[order][stepId];
            const element = layer.querySelectorAll(selector)[0];
            element.setAttribute(stepToAtrKey(step), stepToAtrValue(step));
        }
    }
}

function reorderModel(model){
    const keys = model.keys();
    const newModel = [];
    var i = 0;
    for (const key of keys) {
        if(model[key]){
            newModel[i] = model[key];
            const stepKeys = Object.keys(newModel[i]);
            for (const stepKey of stepKeys) newModel[i][stepKey]['order'] = i;
            i++;
        }
    }
    return newModel;
}

function getLayerByIndex(index){
    const layers = document.getElementById("layers").childNodes;

    for(l in layers){
        if(layers[l].modelIndex == index) return layers[l];
    }
    return null;
}

//on frame change in preview set layer and step as index
function updateSelection(layer, step){
    if(currentLayer.index != layer) {
        const newLayer = getLayerByIndex(layer);
        if(selectLayer(newLayer) || currentOrder.index != step) {
            selectOrder(getOrderAtStep(step));
        }
    } else if(currentOrder.index != step) {
        //set new step only
        selectOrder( getOrderAtStep(step));
    }
}
function getOrderAtStep(step){
    return document.getElementById("order_" + step);
}

//scroll to visible, if necessary
// dir = "start" or "end" 
function scrollToVisible(elem){
    const bcr = elem.getBoundingClientRect();
    const ptop = elem.parentElement.getBoundingClientRect().top;
    if(bcr.bottom - ptop > elem.parentElement.offsetHeight) {    
        elem.scrollIntoView({behavior:"smooth", block: "end"});
    } else if (bcr.top - ptop < 0 ){        
        elem.scrollIntoView({behavior:"smooth", block:"start"});
    }
}

var currentOrder = {}; //id, index
function selectOrder(orderElem){
    const newId = orderElem.getAttribute("id");

    if(newId != currentOrder.id){
        orderElem.classList.add("selected");
        if(currentOrder.id)document.getElementById(currentOrder.id).classList.remove("selected");
        
        scrollToVisible(orderElem);

        currentOrder.id = newId;
        currentOrder.index = orderElem.modelIndex;
        return true;
    } else return false;
    
}

function selectOrderAndUpdatePreview(orderElem){
    if(selectOrder(orderElem)){
        removeHighlight();
        previewJumpToSlide(currentLayer.index, orderElem.modelIndex);        
    }
}

//on click on element
function orderClicked(e){
    selectOrderAndUpdatePreview(findClass("order", e.target));
    e.stopPropagation();
}

var currentLayer = {}; //id, index
function selectLayer(layerElem){
    const newId = layerElem.getAttribute("id");
    if(newId != currentLayer.id){
        const newIndex = layerElem.modelIndex;
        document.getElementById(currentLayer.id).classList.remove("selected");
        layerElem.classList.add("selected");
        currentLayer.id = newId;
        currentLayer.index = newIndex;
        updateModelView();
        return true;
    } else return false;
}

function focusModel(){
    document.getElementById("model").focus();
}

//on click on layer
function layerClicked(e){
    if(selectLayer(e.target)){
        previewJumpToSlide(currentLayer.index, 0);
        focusModel();
    }
}

function jumpToPreviousStep(){
    if(currentOrder.index > 0){
        selectOrderAndUpdatePreview(getOrderAtStep(currentOrder.index - 1));
        return true;
    } else if (currentLayer.index > 1){
        const layer = getLayerByIndex(currentLayer.index-1);  
        const id = layer.getAttribute("id");
        const last = layers[id].length -1;
        previewJumpToSlide(currentLayer.index-1, last);
        return true;
    }
    return false;
}

function jumpToNextStep() {
    const model = layers[currentLayer.id];
    if(currentOrder.index < model.length - 1){
        selectOrderAndUpdatePreview(getOrderAtStep(currentOrder.index + 1));
        return true;
    }  else {
        if(currentLayer.index < Object.keys(layers).length){
            previewJumpToSlide(currentLayer.index+1, 0);
            return true;
        }
    }
    return false; 
}

function previewJumpToSlide(s,v){
    const viewWindow = importDoc.defaultView;
    const slide = parseInt(s)-1;
    if(slide != viewWindow.activeSlide) viewWindow.slideSetActiveSlide(slide); 
    viewWindow.activeSlide = slide; 
    viewWindow.activeEffect = parseInt(v);
    viewWindow.setSlideToState(viewWindow.activeSlide, viewWindow.activeEffect);
}



function previewReady(doc){
    importDoc = doc;
    importDoc.defaultView.addEventListener("hashchange", frameChanged);
    loadModel();    
}

function loadPreview(content) {
    const blob = new Blob([content], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const viewer = document.getElementById("viewer");
    viewer.addEventListener("load", function(e){
        previewReady(viewer.contentWindow.document);
    })
     
    // important to show the view panel here, elseway iframe does not laod properly
    document.documentElement.classList.add("showPreview");

    viewer.src = url;
}


function processFile(name, content) {
    fileName = name;
    document.getElementById("filename").innerHTML = fileName;  
    
// methods to create document without using IFrame
// old mehtod, kept here to remember :-)
//    var parser = new DOMParser();
//    importDoc = parser.parseFromString(injectScriptToPreview(content), "text/xml"); 
//    const content = new XMLSerializer().serializeToString(importDoc);

    loadPreview(content);
}    

function loadModel(){
    layers = {};
    currentLayer = {};
    var model;
    var layer;
   

  
    function mergeSteps(step){
        const order = step['order'];
        if(model[order]){
            model[order][step.id] = step;
        } else model[order] = {[step.id] : step};
    }
    
    function parseElementString(valueStr){
        const values = valueStr.split(';')
        const attributes = {};
        values.forEach(function(val){
            const attr = val.split(':');
            attributes[attr[0]] = attr[1];
        });
        return attributes;
    }

    function parse(type){
                
        // old version for html doc using namespace as part of the selector
        // const elements = importDoc.querySelectorAll("*[ns1\\:" + type + "]");
        
        // new version for xml document. selector is "any namespace"
        // see here: https://stackoverflow.com/questions/23034283/is-it-possible-to-use-htmls-queryselector-to-select-by-xlink-attribute-in-an
        //const elements = importDoc.querySelectorAll("[*|" + type + "]");
        const elements = layer.querySelectorAll("[*|" + type + "]");
        if(elements){
            elements.forEach(function(curVal, curIdx, listObj){
                 const attributes = parseElementString(curVal.getAttribute("ns1:"+type));
                 attributes['id'] = curVal.getAttribute("id");
                 attributes['label'] = curVal.getAttribute("inkscape:label");
                 attributes['type'] = type;
                 mergeSteps(attributes);
            });
        }
    }
        
    const layerElems = importDoc.querySelectorAll("[*|groupmode=layer]");
    const layerView = document.getElementById("layers");
    layerView.replaceChildren(); //clear View

    layerModelIndex = 1;
    layerElems.forEach(function(l){
        layer = l;
        if(!layer.getAttribute("ns1:masterSlide") && !layer.getAttribute("presentationLayer")){
            const id = layer.getAttribute("id");
            const layerName = layer.getAttribute("inkscape:label");
            model = [];
            
            parse("view")
            parse("effectIn")
            parse("effectOut")
        
            model = reorderModel(model);
            model.filter(Number);
            layers[id] = model;

            const li = document.createElement("li");
            li.modelIndex = layerModelIndex++;
            li.appendChild(document.createTextNode(layerName));
            li.setAttribute("id", id);
            layerView.appendChild(li);
            li.addEventListener("click", layerClicked);
        }
    });    
    
    currentLayer = {id:Object.keys(layers)[0], index:1};
    document.getElementById(currentLayer.id).classList.add("selected");
    
    updateModelView();
    
    //do all gui switches with one parent class
    document.documentElement.classList.add("modelLoaded");
       
    document.addEventListener("click", function(e){
            if(helpVisible && !(findClass("helpBubble", e.target) || findClass("helpBox", e.target))){
                setHelpVisible(false);
            }
    });
    
    document.getElementById("model").addEventListener("keydown", function(e){
        function consume(){
            e.preventDefault();
            event.stopPropagation();
        }
        if(e.keyCode == 38){    //keyUp
            jumpToPreviousStep();
            consume();
        } else if (e.keyCode == 40){ //keyDown
            jumpToNextStep();
            consume();
        }
    });
    selectOrder(document.getElementById("order_0"));
    focusModel();
}

const dragNDrop = (function() {
    
  var dropper = document.getElementById("dropper");
  function loadFile(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      processFile(file.name, event.target.result);
    };
    reader.readAsText(file);
  }

  dropper.addEventListener(
    "drop",
    function(ev) {
      deactivateDrop();
      if (ev.dataTransfer.files.length > 0) {
        loadFile(ev.dataTransfer.files[0]);
      }
    },
    false
  );

  // fallback for pointer-event: none; just in case...
  function notMyChild(c) {
    while (c && c != window) {
      if (c == dropper) return false;
      c = c.parentElement;
    }
    return true;
  }

  dropper.addEventListener(
    "dragleave",
    function(e) {
      if (notMyChild(e.relatedTarget)) deactivateDrop();
    },
    false
  );

  function deactivateDrop() {
    dropper.classList.remove("dropActive");
  }

  dropper.addEventListener(
    "dragenter",
    function(e) {
      dropper.classList.add("dropActive");
    },
    false
  );

  window.addEventListener(
    "dragover",
    function(e) {
      e = e || event;
      e.preventDefault();
    },
    false
  );

  window.addEventListener(
    "drop",
    function(e) {
      e = e || event;
      e.preventDefault();
      deactivateDrop();
    },
    false
  );

  var fileChooser = document.getElementById("fileChooser");
  fileChooser.addEventListener(
    "change",
    function(e) {
      if (fileChooser.files.length > 0) loadFile(fileChooser.files[0]);
    },
    false
  );

  dropper.addEventListener("click", function(e) {
    fileChooser.click();
    return false; // avoiding navigation
  });
})();
