document.addEventListener("DOMContentLoaded", async () => {
	
	// Imports modules
	const importModule = await module();
	if (!importModule) {
		ErrorLayout.showError("error-message");
		return;
	}

	const { translation, theme } = importModule;

	(window as any).translationService = translation;

	changeLanguage(translation);
    changeTheme(theme);
	globalEvent();
	initDialogTriggers();

});
