class AppStorage implements IAppStorage {

	protected loading: boolean = true;

	isLoading(): boolean {
		return this.loading;
	}

	getStoredLanguage(): Lang {
		const lang = localStorage.getItem(LANG_KEY_NAME) as Lang;
		return lang || Lang.EN;
	}

	setStoredLanguage(lang: Lang): void {
		if (lang === Lang.EN || lang === Lang.FR) {
			localStorage.setItem(LANG_KEY_NAME, lang);
		}
	}

	getStoredTheme(): ThemeMode {
		if (
			typeof localStorage !== "undefined" &&
			localStorage.getItem(THEME_KEY_NAME)
		) {
			return (
				(localStorage.getItem(THEME_KEY_NAME) as ThemeMode) || ThemeMode.LIGHT
			);
		}
		return window.matchMedia("(prefers-color-scheme: light)").matches
			? ThemeMode.LIGHT
			: ThemeMode.DARK;
	}

	setStoredTheme(theme: ThemeMode): void {
		if (theme === ThemeMode.LIGHT || theme === ThemeMode.DARK)
			localStorage.setItem(THEME_KEY_NAME, theme);
	}
    
}
