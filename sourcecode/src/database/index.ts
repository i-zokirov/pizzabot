import mongoose, { ConnectOptions } from "mongoose";
import { MongoDB_URI } from "../config";

(async () => {
    if (MongoDB_URI)
        try {
            const conn = await mongoose.connect(MongoDB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            console.info(`MONGODB Connected: ${conn.connection.host}`);
        } catch (error) {
            console.error("DB CONNECTION ERROR!");
            console.error(error);
            process.exit(1);
        }
})();
