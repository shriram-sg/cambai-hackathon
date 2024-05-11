
const template = `
  <template id="highlightTemplate">
    <span class="highlight""></span>
  </template>

  <button id="mediumHighlighter">
  <svg width="800px" height="800px" viewBox="-1 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(-896.000000, -304.000000)" id="Group" stroke="#000000" stroke-width="2">
          <g transform="translate(893.000000, 302.000000)" id="Shape">
              <path d="M18,16.5 C19.184,15.6838509 20,13.984472 20,12.0055901 C20,10.0267081 19.184,8.32732919 18,7.5">

</path>
              <path d="M6.00491634,9 L8,9 L13,3 L15,3 L15,20.9958147 L13,20.9958147 L8,15 L6.00491634,15 C4.90034684,15 4.00491634,14.1045695 4.00491634,13 L4.00491634,11 C4.00491634,9.8954305 4.90034684,9 6.00491634,9 Z">

</path>
          </g>
      </g>
  </g>
</svg>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #mediumHighlighter{
    align-items: center;
    background-color: wheat;
    border-radius: 100%;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    height:40px;
    z-index: 9999;
    width: 60px;
    height: 60px;
    border-radius: 100%;
}
  }
  .text-marker {
    fill: white;
  }
`;

class MediumHighlighter extends HTMLElement {
    constructor() {
        super();
        this.highlightedText = "";

        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styled({});
        this.shadowRoot.appendChild(style);

        // Add the template for the highlighter button
        this.shadowRoot.innerHTML += template;

        // Select all headings in the document
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

        // Iterate through each heading and add the highlighter icon
        headings.forEach(heading => {
            // Create a new highlighter button element
            const highlighterButton = document.createElement("button");
            highlighterButton.setAttribute("id", "mediumHighlighter");
            highlighterButton.innerHTML = `
        <svg width="40px" height="40px" viewBox="-1 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(-896.000000, -304.000000)" id="Group" stroke="#000000" stroke-width="2">
              <g transform="translate(893.000000, 302.000000)" id="Shape">
                <path d="M18,16.5 C19.184,15.6838509 20,13.984472 20,12.0055901 C20,10.0267081 19.184,8.32732919 18,7.5"></path>
                <path d="M6.00491634,9 L8,9 L13,3 L15,3 L15,20.9958147 L13,20.9958147 L8,15 L6.00491634,15 C4.90034684,15 4.00491634,14.1045695 4.00491634,13 L4.00491634,11 C4.00491634,9.8954305 4.90034684,9 6.00491634,9 Z"></path>
              </g>
            </g>
          </g>
        </svg>
      `;

            // Apply styles to the highlighter button
            highlighterButton.style.width = '60px';
            highlighterButton.style.height = '60px';
            highlighterButton.style.borderRadius = '100%';
            highlighterButton.style.display = 'inline';
            highlighterButton.id

            // Append the highlighter button beside the heading
            heading.parentNode.insertBefore(highlighterButton, heading.nextSibling);

            highlighterButton.addEventListener("click", () => {
                // Find the next heading
                let nextHeading = heading.nextElementSibling;
                while (nextHeading && !/^H[1-6]$/.test(nextHeading.tagName)) {
                    nextHeading = nextHeading.nextElementSibling;
                }

                // Create range from current heading to next heading
                const range = document.createRange();
                range.setStartAfter(heading);

                // Check if there's a next heading, if not, set the end of the range to the end of the document
                if (nextHeading) {
                    range.setEndBefore(nextHeading);
                } else {
                    range.setEnd(document.body.lastChild, 1);
                }

                // Perform the desired action with the range
                // For example, you can extract the text content:
                const selectedText = range.toString();

                localStorage.setItem('data', JSON.stringify(selectedText))
                console.log(selectedText);

                // Or you can highlight the content:
                this.highlightRange(range);
            });
        });
    }

    get markerPosition() {
        return JSON.parse(this.getAttribute("markerPosition") || "{}");
    }

    get styleElement() {
        return this.shadowRoot.querySelector("style");
    }

    get highlightTemplate() {
        return this.shadowRoot.getElementById("highlightTemplate");
    }

    static get observedAttributes() {
        return ["markerPosition"];
    }

    render() {
        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styled({});
        this.shadowRoot.appendChild(style);

        // Add the template for the highlighter button
        this.shadowRoot.innerHTML += template;

        // Select all headings in the document
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

        // Iterate through each heading and add the highlighter icon
        headings.forEach(heading => {
            // Create a new highlighter button element
            const highlighterButton = document.createElement("button");
            highlighterButton.setAttribute("id", "mediumHighlighter");
            highlighterButton.innerHTML = `
        <svg width="40px" height="40px" viewBox="-1 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(-896.000000, -304.000000)" id="Group" stroke="#000000" stroke-width="2">
              <g transform="translate(893.000000, 302.000000)" id="Shape">
                <path d="M18,16.5 C19.184,15.6838509 20,13.984472 20,12.0055901 C20,10.0267081 19.184,8.32732919 18,7.5"></path>
                <path d="M6.00491634,9 L8,9 L13,3 L15,3 L15,20.9958147 L13,20.9958147 L8,15 L6.00491634,15 C4.90034684,15 4.00491634,14.1045695 4.00491634,13 L4.00491634,11 C4.00491634,9.8954305 4.90034684,9 6.00491634,9 Z"></path>
              </g>
            </g>
          </g>
        </svg>
      `;

            // Apply styles to the highlighter button
            highlighterButton.style.width = '60px';
            highlighterButton.style.height = '60px';
            highlighterButton.style.borderRadius = '100%';
            highlighterButton.style.display = 'inline';

            // Append the highlighter button beside the heading
            heading.parentNode.insertBefore(highlighterButton, heading.nextSibling);

            highlighterButton.addEventListener("click", () => {
                // Find the next heading
                let nextHeading = heading.nextElementSibling;
                while (nextHeading && !/^H[1-6]$/.test(nextHeading.tagName)) {
                    nextHeading = nextHeading.nextElementSibling;
                }

                // Create range from current heading to next heading
                const range = document.createRange();
                range.setStartAfter(heading);

                // Check if there's a next heading, if not, set the end of the range to the end of the document
                if (nextHeading) {
                    range.setEndBefore(nextHeading);
                } else {
                    range.setEnd(document.body.lastChild, 1);
                }

                // Perform the desired action with the range
                // For example, you can extract the text content:
                const selectedText = range.toString();

                localStorage.setItem('data', JSON.stringify(selectedText))

                console.log(selectedText);

                // Or you can highlight the content:
                this.highlightRange(range);
            });
        });
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "markerPosition") {
            this.styleElement.textContent = styled(this.markerPosition);
        }
    }


    highlightRange(range) {
        const clone =
            this.highlightTemplate.cloneNode(true).content.firstElementChild;
        clone.appendChild(range.extractContents());
        range.insertNode(clone);
    }
}

// Define the MediumHighlighter custom element
window.customElements.define("medium-highlighter", MediumHighlighter);