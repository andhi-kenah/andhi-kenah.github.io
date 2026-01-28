/**
 * Reusable Dialog for displaying details
 * Works on : certificates, experiences, skills
 */
class DetailDialog {
    private static instance: DetailDialog | null = null;
    private overlay: HTMLDivElement | null = null;
    private dialogContainer: HTMLDivElement | null = null;

    private constructor() {
        this.createDialog();
    }

    static getInstance(): DetailDialog {
        if (!DetailDialog.instance) {
            DetailDialog.instance = new DetailDialog();
        }
        return DetailDialog.instance;
    }

    private createDialog(): void {
        // Dialog Overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'dialog-overlay';

        // Dialog Container
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.className = 'dialog-container';
        this.dialogContainer.innerHTML = '<button class="dialog-close" aria-label="Close">&times;</button><div class="dialog-content"></div>';

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.dialogContainer);

        this.overlay.addEventListener('click', () => this.hide());
        this.dialogContainer.querySelector('.dialog-close')?.addEventListener('click', () => this.hide());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) this.hide();
        });
    }

    /**
     * Show dialog by copying content from a template element
     * @param dialogId ID of the dialog template element in the HTML
     */
    showFromTemplate(dialogId: string): void {
        const template = document.getElementById(dialogId);
        if (!template || !this.dialogContainer) return;

        const contentArea = this.dialogContainer.querySelector('.dialog-content');
        if (contentArea) {
            contentArea.innerHTML = template.innerHTML;
            this.applyTranslations(contentArea);
        }

        this.overlay?.offsetHeight;
        this.dialogContainer.offsetHeight;

        this.overlay?.classList.add('show');
        this.dialogContainer.classList.add('show');
        document.body.style.overflow = 'hidden';


    }

    private applyTranslations(container: Element): void {
        const elements = container.querySelectorAll('[data-i18n]');
        elements.forEach((element) => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                const text = (window as any).translationService?.getText(key);
                if (text) {
                    element.innerHTML = text;
                }
            }
        });
    }

    hide(): void {
        this.overlay?.classList.remove('show');
        this.dialogContainer?.classList.remove('show');
        document.body.style.overflow = '';
    }

    isVisible(): boolean {
        return this.overlay?.classList.contains('show') || false;
    }

    static show(dialogId: string): void {
        DetailDialog.getInstance().showFromTemplate(dialogId);
    }

    static close(): void {
        DetailDialog.getInstance().hide();
    }
}

const initDialogTriggers = (): void => {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const trigger = target.closest('[data-dialog]');
        
        if (trigger) {
            e.preventDefault();
            const dialogId = trigger.getAttribute('data-dialog');
            if (dialogId) {
                DetailDialog.show(dialogId);
            }
        }
    });
};