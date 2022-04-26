//DATE & HOUR
var today = new Date();

function startTime() {
  var today = new Date();
  var d = today.getDate();
  var Y = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("hora").innerHTML = h + ":" + m;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

startTime()

// SELECT
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 


// CASCATE HANDLER
var cascate = [       //array of openned windows
  document.getElementById('myComputer'),
  document.getElementById('wordPad')
];

function changeCascate (el) {
  let fromIndex = cascate.indexOf(el);
  if(fromIndex != 0){
    cascate.splice(fromIndex, 1); //move the element from it's original index to 0
    cascate.splice(0, 0, el);
  }

  cascate.map(function (block) {
    block.classList.remove('active');
  })
  el.classList.add('active');

  var newCascate = [].concat(cascate).reverse(); //new inverted array

  cascate.map(function (el) {
    zIndex = newCascate.indexOf(el) + 1;
    el.style.zIndex = zIndex; //Set a new z-index to the elements. On the new inverted array the last elements will have a higher z-index
  })
}


//WINDOW SELECT 
var winToggler = document.getElementsByClassName('win_toggle');

function selectWindow (toggler, win) {
  let element = document.getElementById(win);
  let active = document.getElementsByClassName('win_toggle active');

  if(!active.length <= 0){
    active[0].classList.remove('active'); //if there's an active window, removes it's class
  }

  changeCascate(element); // change what window will be on top
  toggler.classList.add('active'); // set a new active window toggler
}
for (i=0; i < winToggler.length; i++){
  winToggler[i].addEventListener('click', function (e) {
    selectWindow(this, this.getAttribute('data-win'));
  })
}


// DRAGGING WINDOWS
var windowList = document.getElementsByClassName('window');

for(i=0;i<windowList.length;i++){
  dragElement(windowList[i]);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.children[0].onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    let winId = elmnt.getAttribute('id');
    for (i=0; i < winToggler.length; i++){
      if(winToggler[i].getAttribute('data-win') == winId){
        selectWindow(winToggler[i], winId);
      }
    }

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// MENU START
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', function (e) {
  this.classList.toggle('active');
})