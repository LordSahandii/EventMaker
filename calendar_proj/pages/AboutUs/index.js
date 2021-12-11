import Head from "next/head";
import AboutUs from "../../components/AboutUs/aboutUs";

// This page will display information about the page
const index = () => {
    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <AboutUs />
        </>
    );
}

export default index;
