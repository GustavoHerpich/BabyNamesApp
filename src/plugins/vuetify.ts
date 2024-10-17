import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#0B3060",
		secondary: "#F38130",
		tertiary: "#87cefa",
		quaternary: "#e7eef7",
		backgroundApp: "#eee",
		insideBackgroundApp: "#FFFFFF",
		backgroundPopup: "#FFFFFF",
		primaryBackground: "#0B3060",
	},
};

const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: "#D4600C",
		secondary: "#435E98",
		tertiary: "#24375F",
		quaternary: "#212227",
		backgroundApp: "#121212",
		insideBackgroundApp: "#383838",
		backgroundPopup: "#383838",
		primaryBackground: "#24375F",
	},
};

export default createVuetify({
  components,
	directives,
  theme: {
    defaultTheme: "lightTheme",
    variations: {
			colors: ["primary", "secondary", "tertiary", "backgroundApp", "quaternary"], 
			lighten: 3,
      darken: 3,
    },
    themes: {
			lightTheme,
      darkTheme
    },
  },
  icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
  }
});
