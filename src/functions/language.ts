/**
 * Set the language to i18n
 * @param translation TranslationService
 */
const changeLanguage = (translation: TranslationService): void => {

	const langSelect = document.getElementById("lang-select") as HTMLSelectElement;
	const langContainer = langSelect?.parentElement;
	
	if (langSelect && langContainer) {
		const updateFlag = () => {
			const flag = langSelect.value === "en" ? "🇺🇸" : "🇫🇷";
			langContainer.setAttribute("data-flag", flag);
		};
		
		const currentLang = translation.getLanguage();
		langSelect.value = currentLang;
		updateFlag();

		// Detect language change
		langSelect.addEventListener("change", () => {
			const selectedLang = langSelect.value === "en" ? Lang.EN : Lang.FR;
			translation.setLanguage(selectedLang);
			updateFlag();			
		});
	}

};
