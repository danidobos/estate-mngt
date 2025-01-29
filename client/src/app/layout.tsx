import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { openSans, robotoSlab } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

import ReduxProvider from "@/lib/redux/provider";
import Toast from "@/components/shared/Toast";
import { PersistAuth } from "@/utils";

export const metadata: Metadata = {
	title: "Home | Alpha Apartments",
	description: "Welcome home",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${openSans.variable} ${robotoSlab.variable}`}>
				<Toast />
				<ReduxProvider>
					<PersistAuth />
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
