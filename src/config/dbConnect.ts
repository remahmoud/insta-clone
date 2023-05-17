import mongoose, { ConnectOptions } from "mongoose";

export default async function dbConnect() {
    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(process.env.MONGODB_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions);
    } catch (error) {
        console.log(error);
    }
}
