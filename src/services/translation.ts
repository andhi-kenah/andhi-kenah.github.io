class TranslationService extends AppStorage implements ITranslation {

	private translations: TranslationData = {};
	private currentLanguage: Lang = Lang.EN;

	constructor() {
		super();
		this.currentLanguage = this.getStoredLanguage();
	}

	getText(key: string): string | null {
		let value = this.translations[this.currentLanguage];

		if (value) {
			const keys = key.split(".");
			
			for (const k of keys) {
				if (value && typeof value === "object" && k in value) {
					value = value[k];
				} else {
					value = this.translations[Lang.EN]; // Fallback to English if translation not found
					for (const fallbackKey of keys) {
						if (value && typeof value === "object" && fallbackKey in value) {
							value = value[fallbackKey];
						} else {
							return null; // Return NULL if no translation found
						}
					}
				}
			}

			return typeof value === "string" ? value : null;
		}

		return null;
	}

	getArray(key: string): any {
		let value = this.translations[this.currentLanguage];

		if (value) {
			const keys = key.split(".");

			for (const k of keys) {
				if (value && typeof value === "object" && k in value) {
					value = value[k];
				}
			}

			return value;
		}

		return null;
	}

	private updateElements() {
		const elements = document.querySelectorAll("[data-i18n]");

		elements.forEach((e) => {
			const key = e.getAttribute("data-i18n");
			if (key) {
				const text = this.getText(key);
				if (text) e.innerHTML = text.toString();
			}
		});

		// Handle placeholder
		const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
		placeholderElements.forEach((e) => {
			const key = e.getAttribute("data-i18n-placeholder");
			if (key) {
				const text = this.getText(key);
				if (text && (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) {
					e.placeholder = text.toString();
				}
			}
		});

		document.documentElement.lang = this.currentLanguage;
	}

	async loadTranslations(): Promise<void> {
		try {
			this.loading = true;
			const response = await fetch(TRANSLATION_JSON_FILE);
			if (!response.ok) {
				throw new Error("Error loading translations");
			}
			this.translations = await response.json();
			this.updateElements();
		} catch (err) {
			ErrorLayout.showError("error-translations");
		} finally {
			this.loading = false;
		}
	}

	setLanguage(lang: Lang): void {
		if (this.loading) return;
		if (lang === Lang.EN || lang === Lang.FR) {
			this.currentLanguage = lang;
			this.setStoredLanguage(lang);
			this.updateElements();
		}
	}

	getLanguage(): Lang {
		return this.currentLanguage;
	}

}
