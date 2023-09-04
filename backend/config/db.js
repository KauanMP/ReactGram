const mongoose = require("mongoose");

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@reactgrambackend.jpa1p2i.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("Conectou ao banco de dados!");

    return dbConn;
  } catch (error) {
    console.log(
      `Não foi possivel conectar-se ao banco de dados: ${error.message}`
    );
  }
};

conn();
