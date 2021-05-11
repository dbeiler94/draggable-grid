function swapItems(index1, index2) {
    const element1 = document.querySelector("[data-index='" + index1 + "']");
    const element2 = document.querySelector("[data-index='" + index2 + "']");
    let sibling1 = element1.previousElementSibling;
    let sibling2 = element2.previousElementSibling;
    // check if there is a previous sibling (for both elements - dragged & dropped)
    // if there is no sibling, we need to use the parentElement
    if (!sibling1) {
        const parent = element1.parentElement;
        element2.insertAdjacentElement('afterend', element1);
        parent.insertAdjacentElement('afterbegin', element2);
    } else if (!sibling2) {
        const parent = element2.parentElement;
        element1.insertAdjacentElement('afterend', element2);
        parent.insertAdjacentElement('afterbegin', element1);
    } else {    // check if the elements are right next to each other
        if (sibling1 === element2) {
            element1.insertAdjacentElement('afterend', element2);
        } else if (sibling2 === element1) {
            element1.insertAdjacentElement('beforebegin', element2);
        } else {
            element1.insertAdjacentElement('afterend', element2);
            sibling2.insertAdjacentElement('afterend', element1);
        }
    }
}

function initDragAndDrop() {
    const draggableItemsContainer = document.querySelector('ul');

    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragged');
    });
    draggableItemsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragged');
    });
    draggableItemsContainer.addEventListener('dragenter', (e) => {
        const draggedItem = document.querySelector('.dragged');
        if (e.target.dataset.index && e.target.dataset.index !== draggedItem.dataset.index) {
            e.target.classList.add('dragover');
        }
    });
    draggableItemsContainer.addEventListener('dragleave', (e) => {
        if (e.target.dataset.index) {
            e.target.classList.remove('dragover');
        }
    });
    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.index); // data-index
        e.target.classList.add('dragged');
    });
    draggableItemsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    draggableItemsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.classList.remove('dragover');
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
        // TODO: HTML-Elemente tauschen
        if (index1 && index2) {
            swapItems(index1, index2);
        }
    });
}

/*
function initTouch() {
    // Instead of adding the eventListeners to the parent ul Element, they are added to the single li Elements
    // This is, because otherwise it would be able to drag the whole ul Element
    const draggableItemsContainer = document.querySelector('ul');
    const draggableItems = document.getElementsByTagName('li');
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    for(i=0;i<draggableItems.length;i++){
        draggableItems[i].addEventListener('touchstart', (e) => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            e.target.classList.add('dragged');
        });
        draggableItems[i].addEventListener('touchmove', (e) => {
            const x = e.touches[0].clientX - initialX;
            const y = e.touches[0].clientY - initialY;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.target.style.transform = "translate(" + x + "px, " + y + "px)";
    
            const elementList = document.elementsFromPoint(lastX, lastY);
            if(elementList.length !== 4){
                if(!elementList[1].classList.contains('dragover')){
                    elementList[1].classList.add('dragover');
                }
            } else {
                let list = document.getElementsByClassName('dragover');
                if(list.length > 0){
                    list[0].classList.remove('dragover');
                }
            }
        });
        draggableItems[i].addEventListener('touchend', (e) => {
            const elementList = document.elementsFromPoint(lastX, lastY);
            if (elementList.length > 1 && elementList[1].hasAttribute('draggable')) {
                // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt
                swapItems(e.target.dataset.index, elementList[1].dataset.index);
            }
            //e.target.style.transform = "translate(0px, 0px)";
            e.target.style.transform = "";
            e.target.classList.remove('dragged');
            elementList[1].classList.remove('dragover');
        });
    }
}
*/

function initTouch() {
    const draggableItemsContainer = document.querySelector('ul');
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    draggableItemsContainer.addEventListener('touchstart', (e) => {
        // After class i changed the event listeners so that it will be checked if the element is an li element
        // Now i can add the event listeners to the parent element and only the li elements will be draggable
        if(e.target.tagName == 'LI'){
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            e.target.classList.add('dragged');
        }
    });
    draggableItemsContainer.addEventListener('touchmove', (e) => {
        if(e.target.tagName == 'LI'){
            const x = e.touches[0].clientX - initialX;
            const y = e.touches[0].clientY - initialY;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.target.style.transform = "translate(" + x + "px, " + y + "px)";

            const elementList = document.elementsFromPoint(lastX, lastY);
            //if(elementList.length !== 4 && elementList.length > 0){
            if(elementList.length > 4){
                if(!elementList[1].classList.contains('dragover')){
                    elementList[1].classList.add('dragover');
                }
            } else {
                let list = document.getElementsByClassName('dragover');
                if(list.length > 0){
                    list[0].classList.remove('dragover');
                }
            }
        }
    });
    draggableItemsContainer.addEventListener('touchend', (e) => {
        if(e.target.tagName == 'LI'){
            const elementList = document.elementsFromPoint(lastX, lastY);
            if (elementList.length > 1 && elementList[1].hasAttribute('draggable')) {
                // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt
                swapItems(e.target.dataset.index, elementList[1].dataset.index);
            }
            //e.target.style.transform = "translate(0px, 0px)";
            e.target.style.transform = "";
            e.target.classList.remove('dragged');
            elementList[1].classList.remove('dragover');
        }
    });
}


// check if javascript gets called on mobile
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

if (detectMob()) {
    initTouch();
} else {
    initDragAndDrop();
}