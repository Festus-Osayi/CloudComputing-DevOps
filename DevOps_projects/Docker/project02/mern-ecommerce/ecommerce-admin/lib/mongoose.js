import mongoose from "mongoose"

export async function createConnections() {
    const uri = process.env.MONGODB_URI
    /** create a new connection instance
     * check if the readyState is 1
     * Returns a promise that resolves when this 
     * connection successfully connects to MongoDB
     */
    return (mongoose.connection.readyState === 1 ? mongoose.connection.asPromise : mongoose.connect(uri))

}