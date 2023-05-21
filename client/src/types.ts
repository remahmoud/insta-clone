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
    comments: IComment[];
    createdAt: string;
    updatedAt: string;
}
export interface IComment {
    readonly id: string;
    user: IUser;
    post: string;
    text: string;
    createdAt: string;
}

export type LoginType = {
    email: string;
    password: string;
};

export type TokenResponseType = {
    token: string;
};

export type RegisterType = {
    fname: string;
    lname: string;
    email: string;
    username: string;
    password: string;
};
