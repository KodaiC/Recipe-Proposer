import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        return await Document.getInitialProps(ctx);
    }

    render() {
        return (
            <Html lang="ja-JP">
                <Head>
                    <meta name="theme-color" content="#75cfa5" />
                    <link rel="manifest" href="/manifest.webmanifest" />
                    <link rel="apple-touch-icon" href="/img/icon-192x192.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;