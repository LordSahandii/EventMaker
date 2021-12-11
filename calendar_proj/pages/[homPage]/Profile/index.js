import Profile from "../../../components/Profile/Profile";
import User from "../../../components/checkUser";
import Error404 from "../../../components/404Error";
import Head from "next/head";

const index = () => {
    // Check if the user is correctly logged in
    if (User =='') 
    {
        return <Error404 />;
    }

    // Display the profile page
    return (
        <>
            <Head>
                <title>Profile Settings</title>
            </Head>
            <Profile />
        </>
    );
}

export default index;
