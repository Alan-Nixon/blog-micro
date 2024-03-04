const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { User } = require('./dbConnection');
const jwt = require('jsonwebtoken')


const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../protos/userBlog.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const postProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(postProto.POSTSERVICE.service, {
    USERDETAILS: (call, callback) => {
        jwt.verify(call.request.userToken, process.env.JWTSECRET, async (err, decoded) => {
            callback(null, { userId: decoded.userId })
        });
    }
})


server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) { console.error("Error binding server:", err); return; }
    console.log(`Server started on port ${port}`);
}
);

module.exports = { server } 