var RIPEMD160 = require('ripemd160')
const bs58 = require('bs58')
import { Buffer } from 'buffer'

var networkVersion = 0x3a;

import CryptoJS from "../components/ripemd160.js";
import { ECPair, fromSeed } from './ecpair';
var networks = require("./networks.js")

export default class qreditCrypto {

    public getAddress(publicKey) {
        var pubKeyRegex = /^[0-9A-Fa-f]{66}$/;

        if (!pubKeyRegex.test(publicKey))
            throw "publicKey is invalid";

        var buffer = new Buffer(CryptoJS.RIPEMD160(publicKey).toString(), "hex");

        var payload = new Buffer(21);
        payload.writeUInt8(networkVersion, 0);
        buffer.copy(payload, 1);

        return bs58.encode(payload);
    }

    public getKeys(secret) {
        var ecpair = fromSeed(secret, networks.qredit);
        // ecpair.publicKey = ecpair.getPublicKeyBuffer().toString("hex");
        // ecpair.privateKey = '';
    
        return ecpair;
    }
}