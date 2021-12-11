import { useRouter } from "next/router";
import NotFound from "../../components/SignIn-SignUp/NotFound";
import Head from "next/head";

// This page will show that the user was not found
const UserNotFound = () => {
    // Import routing
    const router = useRouter();
    return (
        <>
            <Head>
                <title>User Not Found</title>
            </Head>
            <NotFound tryAgain={() => router.push('/SignIn')} goToRegister={() => router.push('/SignIn/SignUp')}/>
        </>);
}

export default UserNotFound;
