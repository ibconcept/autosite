// Get references to the HTML elements
const htmlEditor = document.getElementById("html-editor");
const cssEditor = document.getElementById("css-editor");
const resultIframe = document.getElementById("result-iframe");
const copyHtmlButton = document.getElementById("copy-html-button");
const copyCssButton = document.getElementById("copy-css-button");

// Function to update the iframe with the HTML and CSS content
function updateResult() {
    const htmlContent = htmlEditor.value;
    const cssContent = `<style>${cssEditor.value}</style>`;
    resultIframe.contentDocument.open();
    resultIframe.contentDocument.write(htmlContent + cssContent);
    resultIframe.contentDocument.close();
}

// Add event listeners for input in the editors
htmlEditor.addEventListener("input", updateResult);
cssEditor.addEventListener("input", updateResult);

// Initialize the result iframe
updateResult();

// Handle text translation when the button is clicked
document.getElementById('translate-button').addEventListener('click', function() {
    const textInput = document.getElementById('text-input');

    // Get the text to translate
    const text = textInput.value.toLowerCase();

    // Define translations for common HTML elements
    const translations = {
        'line': '<hr>',
        'box': '<div class="box"></div>',
        'circle': '<div class="circle"></div>',
        'triangle': '<div class="triangle"></div>',
        'button': '<button>Click Me</button>',
        'h2': '<h2>Heading 2</h2>',
        'h3': '<h3>Heading 3</h3>',
        'iframe': '<iframe src="https://www.example.com"></iframe>'
        // Add more translations as needed
    };

    // Check if the text has a translation
    if (translations.hasOwnProperty(text)) {
        const translatedHTML = translations[text];
        // Insert the translated HTML into the HTML editor
        htmlEditor.value = translatedHTML;

        // Translate the CSS for the specific element
        let translatedCSS = '';
        switch (text) {
            case 'line':
                translatedCSS = 'hr { width: 100px; /* User can change this */ }';
                break;
            case 'box':
                translatedCSS = '.box { width: 100px; height: 100px; background-color: yellow; /* User can change this */ }';
                break;
            case 'circle':
                translatedCSS = '.circle { width: 100px; height: 100px; background-color: red; border-radius: 50%; /* User can change this */ }';
                break;
            case 'triangle':
                translatedCSS = '.triangle { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid blue; /* User can change this */ }';
                break;
            case 'button':
                translatedCSS = 'button { background-color: green; color: white; /* User can change this */ }';
                break;
            case 'h2':
                translatedCSS = 'h2 { color: blue; /* User can change this */ }';
                break;
            case 'h3':
                translatedCSS = 'h3 { color: green; /* User can change this */ }';
                break;
            case 'iframe':
                translatedCSS = 'iframe { width: 100%; height: 300px; /* User can change this */ }';
                break;
            // Add more CSS translations as needed
        }

        // Insert the translated CSS into the CSS editor
        cssEditor.value = translatedCSS;

        // Update the result iframe
        updateResult();
    } else {
        // No translation available
        alert('No translation available for this text.');
    }
});

// Handle copying HTML code
copyHtmlButton.addEventListener('click', function() {
    const htmlCode = htmlEditor.value;
    const tempHtmlTextArea = document.createElement('textarea');
    tempHtmlTextArea.value = htmlCode;
    document.body.appendChild(tempHtmlTextArea);
    tempHtmlTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempHtmlTextArea);
    alert('HTML code copied to clipboard');
});

// Handle copying CSS code
copyCssButton.addEventListener('click', function() {
    const cssCode = cssEditor.value;
    const tempCssTextArea = document.createElement('textarea');
    tempCssTextArea.value = cssCode;
    document.body.appendChild(tempCssTextArea);
    tempCssTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempCssTextArea);
    alert('CSS code copied to clipboard');
});
