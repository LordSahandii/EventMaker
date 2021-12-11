import Layout from "./IndexPage/Header"

const Error = () => {
    return (
        <div>
            <Layout />
            <h1>Security risk, Log in again Please</h1>
            <h3>
                The reason why you were logged out was because you refreshed the page<br />
                Or tried to get in without logging in!!!
            </h3>
        </div>
    )
}

export default Error
