import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retryWrites: true
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || '';
const MONGO_HOST = process.env.MONGO_URL || `localhost`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: "mongodb://localhost/TripDocs"
    // url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "TripDocs";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "secretoencriptado";

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token:{
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const STRIPE = {
    publishable_key: "pk_test_51L3OaEHTXUVPcscqJxYPHalqwpQXQlcqp33QNSgPZ3TX4DQ674Geq02MRhy1P4G4yhcKZou6JDDGbJSLgj8WiJ3k006lVdcGpF",
    secret_key: "sk_test_51L3OaEHTXUVPcscqemk62YMX7pvmL4kWHzGPv1Rq5sssukPHCLeOw2jyzjlJRmW3SLRGALLa3dnPuuCSgRUKhroQ00BV0ZzbjA"
}

const config = {
    mongo: MONGO,
    server: SERVER,
    stripe: STRIPE
};

export default config;
