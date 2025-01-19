const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://vane:Gbes0406@store.l0mhd.mongodb.net/?retryWrites=true&w=majority&appName=store";

if (!uri) {
  throw new Error("Por favor, defina a variável de ambiente MONGODB_URI");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
