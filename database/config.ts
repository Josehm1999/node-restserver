import mongoose from "mongoose";

const dbConnection = async() => {
    try {
	await mongoose.connect(`${process.env.MONGODB_CONN}`);
	console.log('Conexión a base de datos exitosa');

    } catch (error) {
	console.log(error);
	throw new Error("Error DB");
    }
}

export default dbConnection;



