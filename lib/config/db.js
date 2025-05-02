import mongoose from 'mongoose';

    export const ConnectDB = async () => {
        try {
            await mongoose.connect('mongodb+srv://devmind:abhay99@cluster0.a3thy.mongodb.net/blogger');
            console.log("DB Connected");
        } catch (error) {
            console.error("DB Connection Error:", error);
        }

    }