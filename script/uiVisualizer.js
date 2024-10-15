<script>
    function visualizeJSON() {
        const jsonInput = document.querySelector('.json-input').value;
        const visualization = document.getElementById('visualization');
        visualization.innerHTML = '';

        try {
            const jsonData = JSON.parse(jsonInput);
            parseElement(jsonData, visualization);
        } catch (e) {
            visualization.innerHTML = '<div class="element">Invalid JSON!</div>';
        }
    }

    function createElement(type, text = '') {
        const element = document.createElement('div');
        element.className = type;
        element.textContent = text;
        return element;
    }

    function parseElement(data, parentElement) {
        if (Array.isArray(data)) {
            data.forEach(item => parseElement(item, parentElement));
        } else if (typeof data === 'object') {
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
                    element = createElement('element', JSON.stringify(data));
                    break;
            }

            if (element) {
                applyLayoutProperties(element, data);
                parentElement.appendChild(element);
            }
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

    document.addEventListener('DOMContentLoaded', () => {
        const exampleJson = {
            "type": "panel",
            "controls": [
                {
                    "type": "button",
                    "text": "Play"
                },
                {
                    "type": "button",
                    "text": "Settings"
                },
                {
                    "type": "label",
                    "text": "Minecraft"
                },
                {
                    "type": "image",
                    "texture": "path/to/image.png"
                }
            ]
        };
        const visualization = document.getElementById('visualization');
        parseElement(exampleJson, visualization);
    });
</script>
</body>
</html>
