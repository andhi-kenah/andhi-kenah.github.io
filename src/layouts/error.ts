class ErrorLayout {
    title: string = "Something went wrong";
    message: string = "An unexpected error has occurred. Please reload the page.";
    buttonText: string = "Reload Page";

    constructor() {}

    private build(): void {
        const erroPage = document.createElement("div");
        erroPage.className = "error";

        const container = document.createElement("div");
        erroPage.appendChild(container);

        const title = document.createElement("h1");
        title.textContent = this.title;
        container.appendChild(title);

        const message = document.createElement("p");
        message.textContent = this.message;
        container.appendChild(message);

        const btn = document.createElement("button");
        btn.textContent = this.buttonText;
        btn.onclick = () => {
            location.reload();
        };
        container.appendChild(btn);

        document.body.appendChild(erroPage);
        document.documentElement.style.overflow = "hidden";
    }

    show(): void {
        this.build();
    }

    public static showError(messageKey: string, translation?: TranslationService): ErrorLayout {
        const d = new ErrorLayout();
        d.title = translation?.getText("error-title") || "Something went wrong";
        d.message = translation?.getText(messageKey) || "An unexpected error has occurred. Please reload the page.";
        d.buttonText = translation?.getText("error-button") || "Reload Page";
        d.show();
        return d;
    }
}
