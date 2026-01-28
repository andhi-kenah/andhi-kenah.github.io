class ThemeService extends AppStorage implements ITheme {

    private currentTheme: ThemeMode = ThemeMode.DARK;
    private btnToggleTheme: HTMLButtonElement;

    constructor() {
        super();
        this.currentTheme = this.getStoredTheme();
        this.btnToggleTheme = document.getElementById("theme-toggle") as HTMLButtonElement;
    }

    getCurrentTheme(): ThemeMode {
        return this.currentTheme;
    }

    private updateIcon(): void {
        const iconBtnToggleTheme = this.btnToggleTheme?.getElementsByTagName("img")[0];
        if (iconBtnToggleTheme) {
            const iconName = this.currentTheme === ThemeMode.DARK ? "sunny" : "moon-outline";
            iconBtnToggleTheme.setAttribute("src", `${ICON_DIR}/${iconName}.svg`);
        }
    }

    loadTheme(): void {
        if (this.currentTheme === ThemeMode.LIGHT) {
            document.documentElement.classList.remove(ThemeMode.DARK);
        }
        this.updateIcon();
        this.loading = false;
    }

    toggleTheme(): void {
        if (this.loading) return;
        !this.btnToggleTheme.classList.contains("theme-changed") && this.btnToggleTheme.classList.add("theme-changed");
        if (this.currentTheme === ThemeMode.DARK) {
            document.documentElement.classList.remove(ThemeMode.DARK);
            this.setStoredTheme(ThemeMode.LIGHT);
            this.currentTheme = ThemeMode.LIGHT;
		} else {
            document.documentElement.classList.add(ThemeMode.DARK);
            this.setStoredTheme(ThemeMode.DARK);
            this.currentTheme = ThemeMode.DARK;
		}
        setTimeout(() => {
            this.updateIcon();
        }, 100);

        setTimeout(() => {
            this.btnToggleTheme.classList.contains("theme-changed") && this.btnToggleTheme.classList.remove("theme-changed");
        }, 300);
    }
    
}