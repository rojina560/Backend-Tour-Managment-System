import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envConfig } from "./app/config/env";


let server:Server;
const startServer = async()=>{
    try{
        await mongoose.connect(envConfig.DB_URL)
        console.log('mongoose is connect');
        server = app.listen(envConfig.PORT,()=>{
            console.log('server is listening port 5000');
        })

    }

    catch(error){
        console.log(error);
    }
}
startServer()
process.on("unhandledRejection",(err)=>{
    console.log('Unhandled Rejection detected.. server shutting down..', err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("uncaughtException",(err)=>{
    console.log(' uncaughtException Rejection detected.. server shutting down..', err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("SIGTERM",(err)=>{
    console.log('sigterm signal received detected.. server shutting down..', err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("SIGINT",(err)=>{
    console.log('sigint signal received detected.. server shutting down..', err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
//unhandledRejection error
// Promise.reject(new Error('i forgot to catch this promise'))
// uncaughtException error
// throw new Error('i forgot to handle this local error')
/**
 * unhandled rejection error
 * uncaugth rejection error
 * signal termination sigterm
*/


 