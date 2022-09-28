import mongoose from "mongoose";

const database = () => {
  mongoose
    .connect(process.env.DB_CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected with server => ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("Connection err", err);
      process.exit(1);
    });
};

export default database;
