
export const checkError = (name, value) => {

    switch (name) {

        case "email":
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Incorrect email";
            }
            return "";

        case "password":
            if (value.length < 8) {
                return "Incorrect password"
            }
            return "";
        default:
            return
    }


}