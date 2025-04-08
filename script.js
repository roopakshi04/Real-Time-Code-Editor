document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const languageSelect = document.getElementById('language-select');
    const codeOutput = document.getElementById('code-output');
    const copyBtn = document.getElementById('copy-btn');
    
    // Link to highlight.js for syntax highlighting
    const highlightCssLink = document.createElement('link');
    highlightCssLink.rel = 'stylesheet';
    highlightCssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/vs2015.min.css';
    document.head.appendChild(highlightCssLink);
    
    // Mock code generation function (replace with actual API call in production)
    function generateCode(description, language) {
        // In a real app, this would be an API call to your backend
        const sampleResponses = {
            javascript: `// JavaScript code for: ${description}\n\nfunction processData(input) {\n  // Implementation based on your description\n  const result = input.toUpperCase();\n  return result;\n}\n\n// Example usage\nconst output = processData("sample");\nconsole.log(output);`,
            
            python: `# Python code for: ${description}\n\ndef process_data(input):\n    # Implementation based on your description\n    result = input.upper()\n    return result\n\n# Example usage\noutput = process_data("sample")\nprint(output)`,
            
            html: `<!-- HTML for: ${description} -->\n<div class="container">\n  <h1>Sample Heading</h1>\n  <p>This is an example paragraph.</p>\n  <button class="btn">Click Me</button>\n</div>`,
            
            css: `/* CSS for: ${description} */\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}\n\n.btn {\n  background-color: #4CAF50;\n  color: white;\n  padding: 10px 15px;\n  border: none;\n  cursor: pointer;\n}`
        };
        
        return sampleResponses[language] || `// No code template available for ${language}`;
    }
    
    // Update code output with syntax highlighting
    function updateCodeOutput() {
        const description = userInput.value.trim();
        const language = languageSelect.value;
        
        if (description) {
            const generatedCode = generateCode(description, language);
            const preElement = document.createElement('pre');
            const codeElement = document.createElement('code');
            codeElement.className = language;
            codeElement.textContent = generatedCode;
            preElement.appendChild(codeElement);
            
            codeOutput.innerHTML = '';
            codeOutput.appendChild(preElement);
            
            // Apply syntax highlighting
            hljs.highlightElement(codeElement);
        }
    }
    
    // Add event listeners
    let timer;
    userInput.addEventListener('input', function() {
        clearTimeout(timer);
        timer = setTimeout(updateCodeOutput, 500); // Add 500ms delay for "real-time" feel
    });
    
    languageSelect.addEventListener('change', updateCodeOutput);
    
    copyBtn.addEventListener('click', function() {
        const codeText = codeOutput.querySelector('code').textContent;
        navigator.clipboard.writeText(codeText).then(function() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });
});
