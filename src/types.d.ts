declare type ModuleExport = {
	translation: Translation;
	theme: Theme;
	loader: Loader
} | null;

declare type TranslationData = Record<string, Record<string, any>>;

declare interface IAppStorage {
	isLoading(): boolean;
	getStoredLanguage(): Lang;
	setStoredLanguage(lang: Lang): void;
	getStoredTheme(): ThemeMode;
	setStoredTheme(theme: ThemeMode): void;
}

declare interface ITranslation extends IAppStorage {
	loadTranslations(): Promise<void>;
	setLanguage(lang: Lang): void;
	getLanguage(): Lang;
}

declare interface ITheme extends IAppStorage {
	loadTheme(): void;
	toggleTheme(): void;
}

declare interface IDialog {
	
}
