const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');


const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnalut',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckeberg',
    'Michael Bloomber',
    'Larry Page'
]

//Store list items
const listItems = [];

let dragStartIndex;

createList();


//Insert list items into DOM

function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `

        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name"> ${person} </p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `
            listItems.push(listItem);

            draggable_list.appendChild(listItem)
        })

    addEventListeners();
}

function dragStart() {
    // console.log('Drag start Event')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
    // console.log('Drag enter Event')
    this.classList.add('over')
}
function dragLeave() {
    // console.log('Drag leave Event')
    this.classList.remove('over')

}
function dragOver(e) {
    // console.log('Drag over Event')
    e.preventDefault();
}
function dragDrop() {
    // console.log('Drag drop Event')
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over')
}
function swapItems(from, to) {
    const itemOne = listItems[from].querySelector('.draggable');
    const itemTwo = listItems[to].querySelector('.draggable');

    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne)
}
//check order

function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            item.classList.add('wrong')
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');

        }
    })
}

//drag and drop
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li')


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);

    })

}


check.addEventListener('click', checkOrder);