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


// injection templates ->

const EASING_DEFINITIONS = `//Easing functions
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;
const n1 = 7.5625;
const d1 = 2.75;

const ease = {
    InSin:  function(x) {return 1 - Math.cos((x * Math.PI) / 2)},
    OutSin: function(x){return Math.sin((x * Math.PI) / 2)},
    InOutSin: function(x){return -(Math.cos(Math.PI * x) - 1) / 2},
    InQuad : function(x){return x*x},
    OutQuad : function(x){return 1 - (1 - x) * (1 - x)},
    InOutQuad : function(x){return x &lt; 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2},
    InCubic : function(x){return x*x*x},
    OutCubic : function(x){return 1 - Math.pow(1 - x, 3)},
    InOutCubic : function(x){return x &lt; 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2},
    InQuart : function(x){return x*x*x*x},
    OutQuart : function(x){return 1 - Math.pow(1 - x, 4)},
    InOutQuart : function(x){return x &lt; 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2},
    InQuint : function(x){return x*x*x*x*x},
    OutQuint : function(x){return 1 - Math.pow(1 - x, 5)},
    InOutQuint : function(x){return x &lt; 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2},
    InExpo : function(x){return x == 0 ? 0 : Math.pow(2, 10 * x - 10)},
    OutExpo : function(x){return x == 1 ? 1 : 1 - Math.pow(2, -10 * x)},
    InOutExpo : function(x){ if( x == 0) return 0;
                                  else if (x == 1) return 1;
                                  else if (x &lt; 0.5) return Math.pow(2, 20 * x - 10) / 2;
                                  else return (2 - Math.pow(2, -20 * x + 10)) / 2;
                    },
    InCirc : function(x){return 1 - Math.sqrt(1 - Math.pow(x, 2))},
    OutCirc : function(x){return Math.sqrt(1 - Math.pow(x - 1, 2))},
    InOutCirc : function(x){ if (x &lt; 0.5) return (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2;
                                 else return (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
                    },
    InBack : function(x){ return c3 * x * x * x - c1 * x * x;},
    OutBack : function(x){ return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);},
    InOutBack : function(x){ if( x &lt; 0.5) return (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2;
                                 else return (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                    },
    InElastic : function(x){ if (x == 0) return 0;
                                 else if (x == 1) return 1;
                                 else return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
                    },
    OutElastic : function(x){ if (x == 0) return 0;
                                  else if ( x == 1) return 1;
                                  else return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
                     },
    InOutElastic : function(x){if (x == 0) return 0;
                                  else if ( x == 1) return 1;
                                  else if (x &lt; 0.5) return -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                                  else return (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
                     },
    InBounce : function(x){return 1 - ease.easeOutBounce(1 - x)},
    OutBounce : function(x){ if (x &lt; 1 / d1) return n1 * x * x;
                                 else if (x &lt; 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
                                 else if (x &lt; 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
                                 else return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    },
    InOutBounce : function(x){ if( x &lt; 0.5) return (1 - ease.easeOutBounce(1 - 2 * x)) / 2;
                                   else return (1 + ease.easeOutBounce(2 * x - 1)) / 2;
                      },
    Linear : function(x){return x},
}

`;

const POP_OPTIONS = `if( effectDict[&quot;effect&quot;] == &quot;pop&quot;)
				{   
					// for pop effect add object position and size to options
					const bbox = newGroup.getBBox();
					const options = effectDict[&quot;options&quot;];
					options[&quot;x&quot;] = bbox.x;
					options[&quot;y&quot;] = bbox.y;
					options[&quot;width&quot;] = bbox.width;
					options[&quot;height&quot;] = bbox.height;
				}
                
				`;

// insert before this
const POP_OPTIONS_POS = `if (!tempEffects[dict[`;

const VIEW_FUNC_START = `/** The view effect.`;
const FADE_FUNC_START = `/** The fade effect.`;
const POP_FUNC_START = `/** The pop effect.`;
const FUNC_END = `return false;\n}`
const VIEW_FUNCTION = `/** The view effect.
 *
 *  @param dir direction the effect should be played (1 = forwards, -1 = backwards)
 *  @param element the element the effect should be applied to
 *  @param time the time that has elapsed since the beginning of the effect
 *  @param options a dictionary with additional options (e.g. length of the effect); for the view effect the options need to contain the old and the new matrix.
 */
 
function view(dir, element, time, options)
{
	var length = 250;
    var easing = ease.Linear;
	var fraction;
    var stop = false;

	if (!options[&quot;matrixInitial&quot;])
	{
		var tempString = slides[activeSlide][&quot;viewGroup&quot;].getAttribute(&quot;transform&quot;);

		if (tempString)
			options[&quot;matrixInitial&quot;] = (new matrixSVG()).fromAttribute(tempString);
		else
			options[&quot;matrixInitial&quot;] = (new matrixSVG()).fromSVGElements(1, 0, 0, 1, 0, 0);
	}

	if ((time == STATE_END) || (time == STATE_START))
    {
		fraction = 1;
        stop = true;
	} 
    else
	{
		if (options) 
        {
            if (options[&quot;length&quot;]) length = options[&quot;length&quot;];
            if (options[&quot;easing&quot;])
            {
                easeFunc = ease[options[&quot;easing&quot;]];
                if( easeFunc) easing = easeFunc;
            }
        }
            
        if( dir == 1)
        {
            fraction = easing(time/length);
        }
        else 
        {
            fraction = 1 - easing((length - time) / length);
        }
        stop = (time >= length);
	}

	if (dir == 1)
	{
        if(stop)
        {
			element.setAttribute(&quot;transform&quot;, options[&quot;matrixNew&quot;].toAttribute());

			set_path_paint_width();

			options[&quot;matrixInitial&quot;] = null;
			return true;            
        }
		else
		{
			element.setAttribute(&quot;transform&quot;, options[&quot;matrixInitial&quot;].mix(options[&quot;matrixNew&quot;], fraction).toAttribute());
		}
	}
	else if (dir == -1)
	{
        if(stop) {
            element.setAttribute(&quot;transform&quot;, options[&quot;matrixOld&quot;].toAttribute());
			set_path_paint_width();

			options[&quot;matrixInitial&quot;] = null;
			return true;
        }
		else
		{
			element.setAttribute(&quot;transform&quot;, options[&quot;matrixInitial&quot;].mix(options[&quot;matrixOld&quot;], fraction).toAttribute());
		}
	}

	return false;
}

`
const FADE_FUNCTION = `/** The fade effect.
 *
 *  @param dir direction the effect should be played (1 = forwards, -1 = backwards)
 *  @param element the element the effect should be applied to
 *  @param time the time that has elapsed since the beginning of the effect
 *  @param options a dictionary with additional options (e.g. length of the effect)
 */
function fade(dir, element, time, options)
{
	var length = 250;
    var easing = ease.Linear;
	var fraction;
    var stop = false;

	if ((time == STATE_END) || (time == STATE_START))
    {
		fraction = 1;
        stop = true;
	}
    else
	{
		if (options) 
        {
            if (options[&quot;length&quot;]) length = options[&quot;length&quot;];
            if (options[&quot;easing&quot;]) 
            {
                easeFunc = ease[options[&quot;easing&quot;]];
                if( easeFunc) easing = easeFunc;
            }  
        }
        
        if( dir == 1)
        {
            fraction = easing(time/length);
        }
        else 
        {
            fraction = easing((length - time) / length);

        }
        if( fraction &lt; 0) fraction = 0;
        else if (fraction &gt; 1) fraction = 1;
        stop = (time >= length);
	}

	if (dir == 1)
	{
    
        if(stop) 
        {
			element.style.display = &quot;inherit&quot;;
			element.setAttribute(&quot;opacity&quot;, 1);
			return true;
        }
        else {
			element.style.display = &quot;inherit&quot;;
			element.setAttribute(&quot;opacity&quot;, fraction);
        }
	}
	else if (dir == -1)
	{
        if(stop)
        {
			element.setAttribute(&quot;opacity&quot;, 0);
			element.style.display = &quot;none&quot;;
			return true;
        }
        else
        {
			element.style.display = &quot;inherit&quot;;
			element.setAttribute(&quot;opacity&quot;, fraction);
		}
	}
	return false;
}
`

const POP_FUNCTION = `/** The pop effect.
 *
 *  @param dir direction the effect should be played (1 = forwards, -1 = backwards)
 *  @param element the element the effect should be applied to
 *  @param time the time that has elapsed since the beginning of the effect
 *  @param options a dictionary with additional options (e.g. length of the effect)
 */
function pop(dir, element, time, options)
{
	var length = 500;
    var easing = ease.Linear;
	var fraction;
    var stop = false;
    var x = 0;
    var y = 0;
    var width = WIDTH;
    var height = HEIGHT;

	if ((time == STATE_END) || (time == STATE_START))
    {
		fraction = 1;
        stop = true;
	}
    else
	{
		if (options) 
        {
            if(options[&quot;length&quot;]) length = options[&quot;length&quot;];
            if(options[&quot;x&quot;]) x = options[&quot;x&quot;];
            if(options[&quot;y&quot;]) y = options[&quot;y&quot;];
            if(options[&quot;width&quot;]) width = options[&quot;width&quot;];
            if(options[&quot;height&quot;]) height = options[&quot;height&quot;];

            if (options[&quot;easing&quot;]) 
            {
                easeFunc = ease[options[&quot;easing&quot;]];
                if( easeFunc) easing = easeFunc;
            }  
        }
            
        if( dir == 1)
        {
            fraction = easing(time/length);
        }
        else 
        {
            fraction = easing((length - time) / length);
        }
        
        if( fraction &lt; 0 ) fraction = 0;
        stop = (time &gt;= length);
	}

	if (dir == 1)
	{
    
        if(stop)
        {
			element.setAttribute(&quot;opacity&quot;, 1);
			element.removeAttribute(&quot;transform&quot;);
			element.style.display = &quot;inherit&quot;;
			return true;
        }
		else
		{
			element.style.display = &quot;inherit&quot;;
            
			var opacityFraction = fraction * 3;
			if (opacityFraction &gt; 1) opacityFraction = 1;
			element.setAttribute(&quot;opacity&quot;, opacityFraction);
            
            const counterfrac = 1.0 - fraction;
			const offsetX =  x * counterfrac + width * counterfrac / 2.0;
			const offsetY =  y * counterfrac + height * counterfrac / 2.0;
			
            element.setAttribute(&quot;transform&quot;, &quot;translate(&quot; + offsetX + &quot;,&quot; + offsetY + &quot;) scale(&quot; + fraction + &quot;)&quot;);
		}
	}
	else if (dir == -1)
	{       
        if (stop) 
        {
			element.setAttribute(&quot;opacity&quot;, 0);
			element.removeAttribute(&quot;transform&quot;);
			element.style.display = &quot;none&quot;;
			return true;
        }
		else
		{
            element.style.display = &quot;inherit&quot;;
			element.setAttribute(&quot;opacity&quot;, fraction);

            const counterfrac = 1.0 - fraction;
			const offsetX =  x * counterfrac + width * counterfrac / 2.0;
			const offsetY =  y * counterfrac + height * counterfrac / 2.0;

			element.setAttribute(&quot;transform&quot;, &quot;translate(&quot; + offsetX + &quot;,&quot; + offsetY + &quot;) scale(&quot; + fraction + &quot;)&quot;);
		}
	}
	return false;
}

`

 const VERSION_PHRASE = 'modified by cutroom version: ';
 const VERSION_START = '<svg';

// <- injection templates


 /** current Version of cutroom. 
  * for future use. Since cutroom started to modify js code it is neccessary
  * to identify presentations, that are already updated by cutroom.
  * If more changes going to happen, there must be some version indicating what already has been modified.
  */ 
 const VERSION = '1.0';


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
    
    const serializer = new XMLSerializer();
    const content = serializer.serializeToString(downloadDoc);

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


var selectedPart = null;
var selectedPartView = null;

function selectPart(part, partView){
    deselectPart();
    if(partView != null && part != null){
        partView.classList.add("selected");
        if(part.easing == null)part.easing = "Linear";
        setOptionBarValues(part.length, part.name, part.easing, (part.type != "view"))
        selectedPart = part;
        selectedPartView = partView;
    }
}

function deselectPart(){
    if(selectedPartView != null) {
        selectedPartView.classList.remove("selected");
    }
    selectedPart = null;
    selectedPartView = null;
}

function setSelectedPartTime(time){
    if(selectedPart && selectedPart.length != time){
        selectedPart.length = time;
        updateDocAttributes(selectedPart);
        updatePreview();
    }
}

function setSelectedPartStyle(style) {
    if(selectedPart && selectedPart.name != style){
        selectedPart.name = style;
        updateDocAttributes(selectedPart);
        updatePreview();
    }
}

function setSelectedPartEasing(easing){
    if(selectedPart && selectedPart.easing != easing){
        selectedPart.easing = easing;
        updateDocAttributes(selectedPart);
        updatePreview();
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
                partView.addEventListener("click", function(e){                    
                    selectPart(part, partView);
                });
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

// the actual document of the preview 
var importDoc;

// a clean shaddow document for download 
// without any dom manipulations the jessyink script will do within the preview windows
var downloadDoc;

// the name of the currently loaded file
var fileName;

/**
 * update doc according to model changes
 */
 
function stepToAtrValue(step){
    return "name:"+step.name+";order:" + step.order + ";length:" + step.length + ";easing:" + step.easing;
}
    
function stepToAtrKey(step){        
    return "ns1:" + step.type;
}

function updateDocAttributes(step){
            const val = stepToAtrValue(step);
            const key = stepToAtrKey(step);
            
            //update the preview document and the shaddow doc for download
            const previewElement = importDoc.getElementById(step.id);
            const downloadElement = downloadDoc.getElementById(step.id);
            
            previewElement.setAttribute(key, val);
            downloadElement.setAttribute(key, val);
}

function updateDoc(){            
// old method
//    const layer = importDoc.querySelector('[id= "' + currentLayer.id + '"]');
    const model = layers[currentLayer.id];
    const orders = model.keys();
    
    for (const order of orders) {
        var steps = Object.keys(model[order]);
        for( const stepId of steps){
            const step = model[order][stepId];
/* old method
            const selector = '[id= "' + stepId + '"]';
            const element = layer.querySelectorAll(selector)[0];
*/
            
            rt(step); 

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
		deselectPart();
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

function getViewForPart(part, orderElem){
    const parts = orderElem.querySelectorAll(".part");
    var result = null;
    parts.forEach( function(p){
        if(p.modelId == part.id){
            result = p;
            return;
        }
    });
    return result;
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
        if(!selectedPart || selectedPart.order != currentOrder.index){
                // select first part in order
                const order = layers[currentLayer.id][currentOrder.index];
                const aPart = Object.values(order)[0];
                selectPart(aPart, getViewForPart(aPart, orderElem));
        }
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
    const order = findClass("order", e.target);
    selectOrderAndUpdatePreview(order);
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
        deselectPart();
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

/**
 * creates a shaddow document for later download, 
 * that will not be manipulated by the jessyink scripts in the preview.
 */
function createDownloadDoc(content){
    const parser = new DOMParser();
    // scripts will not be executed, so we have a clean version here
    downloadDoc = parser.parseFromString((content), "text/xml");
}

function processFile(name, content) {
    fileName = name;
    document.getElementById("filename").innerHTML = fileName;
    
    content = injectJSUpdate(content);
    
    loadPreview(content);
    createDownloadDoc(content);

// thanks, dear past schulzki! :-)
  
// methods to create document without using IFrame
// old mehtod, kept here for future schulzki to remember :-)
//    var parser = new DOMParser();
//    importDoc = parser.parseFromString(injectScriptToPreview(content), "text/xml"); 
//    const content = new XMLSerializer().serializeToString(importDoc);

    
}

// modifies the pages jessyink script to support easing functions
// also fixes the pop function.
function injectJSUpdate(content){
    if( content.includes(VERSION_PHRASE)) return content; // later on maybe we have to check version and update gap
    else {
        const versionInsert = '<!-- ' + VERSION_PHRASE + VERSION + '-->\n';
        versionPos = content.indexOf(VERSION_START);
        const viewPos = content.indexOf(VIEW_FUNC_START);
        const viewEnd = content.indexOf(FUNC_END, viewPos) + FUNC_END.length;
        
        const fadePos = content.indexOf(FADE_FUNC_START, viewEnd);
        const fadeEnd = content.indexOf(FUNC_END,fadePos) + FUNC_END.length;
        
        const popPos = content.indexOf(POP_FUNC_START, fadeEnd);
        const popEnd = content.indexOf(FUNC_END, popPos)+ FUNC_END.length;
        
        const popDefPos = content.indexOf(POP_OPTIONS_POS);
        
        var pimped = content.substring(0,versionPos) +  // content up to version Insertion place
            versionInsert +                             // cutroom version labelCont
            content.substring(versionPos, popDefPos) +  // content to position where pop options will be added
            POP_OPTIONS +                               // for pop effect to work porperly, add bounding box of object to be scaled to options
            content.substring(popDefPos, viewPos) +     // content to position where easing is added
            EASING_DEFINITIONS +                        // easing definitions
            VIEW_FUNCTION +                             // new view function
            FADE_FUNCTION +                             // new fade function
            //appear comes here
            content.substring(fadeEnd,popPos) +         // original appear code
            POP_FUNCTION +                              // new pop function
            content.substring(popEnd);                  // rest of original code
     
        //console.log(pimped);
        
        return pimped;
    }
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
        
        switch(e.keyCode){
            case 38:    //keyUp
                jumpToPreviousStep();
                consume();
                break;
            case  40:   //keyDown
                jumpToNextStep();
                consume();
                break;
            case 37:    //left
            case 39:    //right
                importDoc.defaultView.keydown(e)    // forward to view WIndow
                consume();
                break;
        }
    });
    selectOrder(document.getElementById("order_0"));
    focusModel();
}


// OPtion Bar handling

const effectTime = document.getElementById("effectTime");
const effectStyle = document.getElementById("effectStyle");
const effectEasing = document.getElementById("effectEasing");

function setOptionBarValues(time, style, easing, hasStyle){
        effectTime.value = time;
        effectStyle.innerHTML = style;
        effectEasing.innerHTML = easing;
        if(hasStyle) effectStyle.parentElement.classList.remove("suspended");
        else effectStyle.parentElement.classList.add("suspended");
}

// dropdown in options panel
document.querySelectorAll(".dropdown").forEach(function(x){
        x.addEventListener("mouseenter", function(e){
            var dv = e.currentTarget.querySelector(".dropValue");
            if(dv) {
                var val = dv.innerHTML;
                var entries = e.currentTarget.querySelectorAll("li");
                entries.forEach(function (entry) {
                    if(entry.innerHTML == val) entry.classList.add("highlight");
                    else entry.classList.remove("highlight");
                });
            }
        });
    });

const callbackMap = {
    "effectEasing": setSelectedPartEasing,
    "effectStyle": setSelectedPartStyle
}

document.querySelectorAll(".dropdown li").forEach(function(x){
    x.addEventListener("click", function(e){
        var dropdown = e.currentTarget.parentElement;
        var label = dropdown.parentElement.querySelector(".dropValue");        
        var newVal = e.currentTarget.innerHTML;
        label.innerHTML = newVal;
        var callback = callbackMap[label.id];
        callback(newVal);
        dropdown.style.height = "0px";
        setTimeout(function (){
            dropdown.style.height = null;
         }, 10);
    });
});

effectTime.addEventListener("change", function(e){
    setSelectedPartTime(effectTime.value);
});



// drag and drop handling
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
