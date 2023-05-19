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
export interface IPost {
    readonly id: string;
    user: IUser;
    caption: string;
    image: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
}
