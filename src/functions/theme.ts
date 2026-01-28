/**
 * Switch theme between "light" and "dark"
 * @param theme Theme
 */
const changeTheme = (theme: ThemeService): void => {
    const btnToggleTheme = document.getElementById("theme-toggle") as HTMLButtonElement;

    btnToggleTheme?.addEventListener("click", () => {
        theme.toggleTheme();
    });
}