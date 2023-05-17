import mongoose, { ConnectOptions } from "mongoose";

export default async function dbConnect() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            family: 4,
        } as ConnectOptions);
    } catch (error) {
        console.log(error);
    }
}
