class UserAuthentication {
    constructor(
        public name: string,
        public password: string,
        public passwordExpiration: string,
        public role: number,
    ) {}
}

export default UserAuthentication;
