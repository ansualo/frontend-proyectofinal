
export const checkError = (name, value) => {

    switch (name) {

        case "email":
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Incorrect email";
            }
            return "";

        case "password":
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/.test(value)) {
                return (
                    <div>
                        <li>At least one lowercase letter</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one number</li>
                        <li>Min length 8 characters</li>
                    </div>
                )
            }
            return "";

        default:
            return
    }


}