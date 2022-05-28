import "/css/bootstrap.min.css";
import "/css/index.css"
import {useEffect} from "react";

const MyApp = ({Component, pageProps}) => {

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;