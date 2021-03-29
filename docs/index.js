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
    const index1 = e.dataTransfer.getData('text/plain');
    const index2 = e.target.dataset.index;
    // TODO: HTML-Elemente tauschen
    if(index1 && index2){
        swapItems(index1, index2);
    }
});

function swapItems(index1, index2){
    const element1 = document.querySelector("[data-index='" + index1 + "']");
    const element2 = document.querySelector("[data-index='" + index2 + "']");
    let sibling1 = element1.previousElementSibling;
    let sibling2 = element2.previousElementSibling;
    // check if there is a previous sibling (for both elements - dragged & dropped)
    // if there is no sibling, we need to use the parentElement
    if(!sibling1){
        const parent = element1.parentElement;
        element2.insertAdjacentElement('afterend', element1);
        parent.insertAdjacentElement('afterbegin', element2);
    } else if(!sibling2){
        const parent = element2.parentElement;
        element1.insertAdjacentElement('afterend', element2);
        parent.insertAdjacentElement('afterbegin', element1);
    } else {    // check if the elements are right next to each other
        if(sibling1 === element2) {
            element1.insertAdjacentElement('afterend', element2);
        } else if(sibling2 === element1){
            element1.insertAdjacentElement('beforebegin', element2);
        } else {
            element1.insertAdjacentElement('afterend', element2);
            sibling2.insertAdjacentElement('afterend', element1);
        }
    }
}