class UserModel {
    firstName;
    lastName;
    email;
    password;
    password_confirm;

    constructor() {

    }

    set(firstName, lastName, email, password, password_confirm) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.password_confirm = password_confirm;
    }
}
