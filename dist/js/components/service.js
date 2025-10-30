/**
 * Service custom component
 * <sss-service />
 */

const stylesheet = document.createElement('template');
stylesheet.innerHTML = `
<style>
header {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--color-main) solid 1px;
    padding-bottom: 0.75em;
    align-items: center;
    cursor: pointer;
    position: relative;
}

header > div {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
}

.label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-small);
    text-transform: uppercase;
}

header h3 {
    font-size: var(--font-size-big);
    font-weight: bold;
}

header button {
    width: 16px;
    height: 16px;
    position: relative;
    transition: transform var(--transition-timing) var(--transition-function);
}

header button:before,
header button:after {
    content: "";
    display: block;
    width: 1em;
    height: 1px;
    top: 50%;
    left: 50%;
    transform: translate(-50%);;
    background: var(--color-main);
    position: absolute;
    transform-origin: left;
}

header button:after {
    transform: rotate(90deg) translate(-50%);;
}

header:hover button:before,
header:hover button:after {
    height: 2px;
    transition: height var(--transition-timing) var(--transition-function);
}

.body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--service-body-transition-timing) var(--transition-function);
}

.body > div {
    overflow: hidden;
    padding-top: 0.75em;
}

.body ::slotted(ul) {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

[data-active] header button {
    transform: rotate(45deg);
}

[data-active] .body {
    grid-template-rows: 1fr;
}
</style>`;

function getTemplate ({ label, title }) {
    const template = document.createElement('template');
    template.innerHTML = `
        <article>
            <header>
                <div>
                    <span class="label">s${label} </span>
                    <h3>${title}</h3>
                </div>
                <button aria-label="Expand"></button>
            </header>
            <div class="body">
                <div>
                    <slot name="body"></slot>
                </div>
            </div>
        </article>`;
    return template.content.cloneNode(true);
}

class Service extends HTMLElement {
    active;

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(document.getElementById("css-reset").content.cloneNode(true));
        this.shadowRoot.appendChild(stylesheet.content.cloneNode(true));
        this.shadowRoot.appendChild(getTemplate({
            label: this.label.padStart(3, "0"),
            title: this.title
        }));

        const article = this.shadowRoot.querySelector("article");
        const header = article.querySelector("header");
        header.addEventListener("click", () => {
            article.toggleAttribute("data-active");
        });
    }

    get title() {
        return this.getAttribute("title");
    }

    get label() {
        return this.getAttribute("label");
    }
}

customElements.define('sss-service', Service);
