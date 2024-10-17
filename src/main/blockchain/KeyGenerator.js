import pkg from "elliptic";

const ecal = new pkg.ec("secp256k1");
const key = ecal.genKeyPair();

const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log("Public Key ", publicKey);
console.log("Private Key ", privateKey);
