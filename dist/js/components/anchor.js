/**
 * Anchor custom component
 * <sss-anchor />
 */

const stylesheet = document.createElement('template');
stylesheet.innerHTML = `
<style>
a {
    color: inherit;
    text-decoration: none;
}

:host {
    font-family: var(--font-family-serif);
    font-size: 1.2em;
    position: relative;
}

:host > div {
    position: relative;
    padding: 0 0.2em;
    display: inline-block;
}

:host > div:after {
    content: "";
    display: block;
    height: 0.16em;
    position: absolute;
    top: 0.7em;
    left: 0;
    right: 0;
    background: var(--logo-color);
    animation: 3s linear slide-in;
    transition: right 0.1s ease;
}

:host(:not([active]):hover) > div:after,
:host([active]) > div:after {
    right: 100%;
}

</style>`;

class Anchor extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(stylesheet.content.cloneNode(true));
        this.shadowRoot.appendChild(getTemplate({ 
            href: this.href,
            label: this.label
        }));
    }

    get href() {
        return this.getAttribute("href");
    }

    get label() {
        return this.getAttribute("label");
    }

    get active() {
        return this.hasAttribute("active");
    }

    set active(value) {
        if(value) {
            this.setAttribute("active", value);
        } else {
            this.removeAttribute("active");
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }
}

function getTemplate ({ label, href }) {
    const template = document.createElement('template');
    template.innerHTML = `
        <div>
            <div>
                <a href="${href}">${label}</a>
            </div>
        </div>`;
    return template.content.cloneNode(true);
}

customElements.define('sss-anchor', Anchor);
