
export const socketEvents = async(io) => {

    io.on("connection", async(socket) => {
        console.log("usuario conectado!");

    });

}
