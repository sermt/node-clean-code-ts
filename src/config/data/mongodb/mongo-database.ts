import mongoose from "mongoose";

export class MongoDatabase {
  static async connect(options: Options): Promise<void> {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
    } catch (error) {
      throw error;
    }
  }
}

interface Options {
  mongoUrl: string;
  dbName: string;
}
