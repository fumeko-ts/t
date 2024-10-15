document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button').addEventListener('click', visualizeJSON);
});

function visualizeJSON() {
    const jsonInput = document.querySelector('.json-input').value;
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';

    console.log("Visualize button clicked");
    
    try {
        const jsonData = JSON.parse(jsonInput);
        console.log("Parsed JSON:", jsonData);
        parseElement(jsonData, visualization);
    } catch (e) {
        console.error("Error parsing JSON:", e);
        visualization.innerHTML = '<div class="element">Invalid JSON!</div>';
    }
}

function createElement(type, text = '') {
    const element = document.createElement('div');
    element.className = type;
    if (text) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    return element;
}

function parseElement(data, parentElement) {
    if (Array.isArray(data)) {
        data.forEach(item => parseElement(item, parentElement));
    } else if (typeof data === 'object' && data.type) {
        let element;

        switch (data.type) {
            case 'button':
                element = createElement('button', data.text);
                break;
            case 'panel':
            case 'stack_panel':
            case 'input_panel':
            case 'collection_panel':
            case 'grid':
                element = createElement('panel');
                if (data.controls) {
                    data.controls.forEach(control => parseElement(control, element));
                }
                break;
            case 'label':
                element = createElement('label', data.text);
                break;
            case 'image':
                element = createElement('image');
                element.style.backgroundImage = `url(${data.texture})`;
                break;
            default:
                element = createElement('element');
                element.textContent = JSON.stringify(data, null, 2);
                break;
        }

        if (element) {
            applyLayoutProperties(element, data);
            parentElement.appendChild(element);
        }
    } else {
        parentElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)));
    }
}

function applyLayoutProperties(element, data) {
    if (data.size) {
        element.style.width = data.size[0] || 'auto';
        element.style.height = data.size[1] || 'auto';
    }
    if (data.offset) {
        element.style.marginLeft = data.offset[0] || '0px';
        element.style.marginTop = data.offset[1] || '0px';
    }
}
