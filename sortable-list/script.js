


const draggable_list=document.getElementById("draggable-list");
const check=document.getElementById("check");


const populatedCountries=[
    'India',
    'China',
    "United States of America",
    "Indonesia",
    "Pakistan",
    "Nigeria",
    "Brazil",
    "Bangladesh",
    "Russia",
    "Mexico"
];

    

const ListItems=[];

let dragStartIndex;

CreateList();

const numbers=[]

function CreateList() {
    [...populatedCountries]
    .map(a=>({value: a ,sort: Math.random() }))
    .sort((a,b) => a.sort-b.sort)
    .map(a=>a.value)
    .forEach((person,index)=>{
        
      const ListItem = document.createElement('li');
      

      ListItem.setAttribute('data-index',index);
     

      ListItem.innerHTML= ` <span class="number"> ${index+1} </span>
      <div class="draggable" draggable="true">
       <p class="person-name"> ${person} </p>
       <i class="fas fa-grip-lines"></i>
      </div>
    `;
    ListItems.push(ListItem);

   draggable_list.appendChild(ListItem)
    });

    addEventListeners();  
}

function showSuccessMessage(message) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'success-message';
  msgDiv.innerText = message;
  document.body.appendChild(msgDiv);

  // Auto-remove message after 3 seconds
  setTimeout(() => {
    msgDiv.remove();
  }, 5000);
}


function dragStart(){
   
  //console.log('Event: ','dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}


function dragEnter(){
  this.classList.add('over')
  //console.log('Event: ','dragenter');
}

function dragLeave(){
  this.classList.remove('over')
 // console.log('Event: ','dragleave');
}

function dragOver(e){
  //console.log('Event: ','dragover');
  e.preventDefault();
}

function dragDrop(){
  const dragEndIndex= +this.getAttribute('data-index');
  swapItems(dragStartIndex,dragEndIndex);
  this.classList.remove('over');
  //console.log('Event: ','drop');
}

function swapItems(fromIndex,toIndex){
   const itemOne = ListItems[fromIndex].querySelector('.draggable');
   const itemTwo = ListItems[toIndex].querySelector('.draggable');
   ListItems[fromIndex].appendChild(itemTwo);
   ListItems[toIndex].appendChild(itemOne);

  }

function checkOrder(){
  let isCorrect=true;
  ListItems.forEach((ListItem,index) => {
     const personName = ListItem.querySelector(".draggable")
     .innerText.trim();
  
     if (personName!== populatedCountries[index]) {
      ListItem.classList.add('wrong');
      ListItem.classList.remove('right');
      isCorrect=false;
}    else{
       ListItem.classList.remove('wrong');
       ListItem.classList.add('right');
}
    })

  if (isCorrect) {
    showSuccessMessage(" Great job! All countries are in the correct order.");
  }
}

function addEventListeners(){
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart',dragStart);

  });

  dragListItems.forEach(item =>{
     item.addEventListener('dragover',dragOver);
     item.addEventListener('drop',dragDrop);
     item.addEventListener('dragenter',dragEnter);
     item.addEventListener('dragleave',dragLeave);
  });
}

check.addEventListener('click',checkOrder);

