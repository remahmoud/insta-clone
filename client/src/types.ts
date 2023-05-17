export interface IUser {
    readonly id: string;
    fname: string;
    lname: string;
    email: string;
    username: string;
    avatar: string;
    followers: string[];
    following: string[];
}
