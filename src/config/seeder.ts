import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import dbConnect from "./dbConnect";

dotenv.config();

const createFakeUser = async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();

    return {
        fname,
        lname,
        username: faker.internet.userName({
            firstName: fname,
            lastName: lname,
        }),
        email: faker.internet.email({ firstName: fname, lastName: lname }),
        password: hashedPassword,
    };
};

(async () => {
    try {
        await dbConnect();

        const users = Array(10)
            .fill(1)
            .map(async () => {
                return await createFakeUser();
            });

        const createdUsers = await Promise.all(users);

        await User.insertMany(createdUsers).then(() => {
            console.log("Users created successfully");

            process.exit();
        });
    } catch (err) {
        console.error(err);
    }
})();
