const main = document.querySelector('main');
const searchInput = main.querySelector('.search');

// Store original HTML content for restoration
const elementsMap = new Map();

function highlightTextNodes(element, searchText) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToReplace = [];
    let node;
    
    while (node = walker.nextNode()) {
        const text = node.textContent;
        const lowerText = text.toLowerCase();
        const lowerSearch = searchText.toLowerCase();
        
        if (lowerText.includes(lowerSearch)) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(node => {
        const text = node.textContent;
        const lowerText = text.toLowerCase();
        const lowerSearch = searchText.toLowerCase();
        const index = lowerText.indexOf(lowerSearch);
        
        const before = text.slice(0, index);
        const match = text.slice(index, index + searchText.length);
        const after = text.slice(index + searchText.length);
        
        const span = document.createElement('span');
        span.innerHTML = `${before}<mark style="background-color: yellow;">${match}</mark>${after}`;
        
        node.replaceWith(span);
    });
}

searchInput.addEventListener('input', (ev) => {
    const value = ev.target.value.trim();
    const elements = main.querySelectorAll("span, h1, h2, b");
    
    for(const element of elements){
        // Store original HTML if not already stored
        if(!elementsMap.has(element)){
            elementsMap.set(element, element.innerHTML);
        }
        
        const originalHTML = elementsMap.get(element);
        
        // Always restore first
        element.innerHTML = originalHTML;
        
        // Then highlight if there's a search value
        if(value.length > 0){
            highlightTextNodes(element, value);
        }
    }
})