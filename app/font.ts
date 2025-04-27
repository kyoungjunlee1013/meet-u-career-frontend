import localFont from "next/font/local";

export const dotFont = localFont({
    src: [
        {
            path: "/fonts/42dotSans-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "/fonts/42dotSans-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-dot",
    preload: true,
});
