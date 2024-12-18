export type Theme = "light" | "dark";
export interface AppTheme {
  theme: Ref<Theme>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
export const themeKey: InjectionKey<AppTheme> = Symbol("theme");

export const provideTheme = () => {
  const theme = ref<Theme>("light");
  const setTheme = (_theme: Theme) => {
    theme.value = _theme;
    if (import.meta.client) {
      if (theme.value === "dark") document.body.classList.add("dark");
      if (theme.value === "light") document.body.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    if (import.meta.client) {
      if (theme.value === "dark") document.body.classList.add("dark");
      if (theme.value === "light") document.body.classList.remove("dark");
    }
  };

  provide(themeKey, { theme, setTheme, toggleTheme });
  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export const useTheme = () => {
  const theme = inject(themeKey);
  if (!theme) throw new Error("Provide theme to use it");
  return theme;
};
