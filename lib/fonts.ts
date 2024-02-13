import {
	JetBrains_Mono as FontMono,
	Atkinson_Hyperlegible as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-sans",
});

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
});
