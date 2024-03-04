const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../protos/userBlog.proto'),
    { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const postProto = grpc.loadPackageDefinition(packageDefinition);
const client = new postProto.POSTSERVICE('localhost:50051', grpc.credentials.createInsecure());



module.exports = client 