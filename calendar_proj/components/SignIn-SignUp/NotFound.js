import optionClass from "./options.module.css";

const NotFound = ({ tryAgain, goToRegister }) => {
    return (
        <div className={optionClass.divMother}>
             <div className={optionClass.div}>
                <h1 className={optionClass.danger}>The user you were trying to log into was not found</h1>
                <img src='https://img.icons8.com/ios/452/user-not-found.png' alt="user not found" />
                <form>
                    <input type='button' value='Try Again' onClick={tryAgain} />
                    <input type='button' value='Register' onClick={goToRegister} />
                </form>
            </div>
        </div>
       
    );
}

export default NotFound;
