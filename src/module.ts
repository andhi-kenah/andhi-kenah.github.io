/**
 * Initialize module globally
 * @returns Promise<{ translation: Translation; theme: Theme, loader: Loader } | null>
 */
const module = async (): Promise<ModuleExport> => {

	// Initialize module
	const translation = new TranslationService();
	const theme = new ThemeService();
	const loader = new LoaderService();

	try {
		loader.startLoader();
		await translation.loadTranslations();
		theme.loadTheme();
	} catch (err) {
		ErrorLayout.showError("error-module", translation);
		return null;
	} finally {
		loader.stopLoader();
	}

	// Exports modules
	return {
		translation,
		theme,
		loader
	};
};
