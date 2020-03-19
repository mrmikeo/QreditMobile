import * as Crypto from 'expo-crypto';

const bs58 = require('bs58')

var typeforce = require('typeforce')
var types = require('./types')


var NETWORKS = require('./networks')
var BigInteger = require('bigi')


import CryptoJS from "../components/ripemd160.js";

var BN = require('bn.js')

function uint256(x, base) {
  return new BN(x, base)
}

const N  = uint256("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16)

/**
 * Provide either `d` or `Q` but not both.
 *
 * @constructor
 * @param {BigInteger} [d] Private key.
 * @param {Point} [Q] Public key.
 * @param {object} [options]
 * @param {boolean} [options.compressed=true]
 * @param {Network} [options.network=networks.ark]
 */
export function ECPair (d, Q, options) {
  if (options) {
    typeforce({
      compressed: types.maybe(types.Boolean),
      network: types.maybe(types.Network)
    }, options)
  }

  options = options || {}

  if (d) {
    if (d.signum() <= 0) throw new Error('Private key must be greater than 0')
    if (d.compareTo(N) >= 0) throw new Error('Private key must be less than the curve order')
    if (Q) throw new TypeError('Unexpected publicKey parameter')

    this.d = d
  } else {
    typeforce(types.ECPoint, Q)

    this.__Q = Q
  }

  /** @type {boolean} */ this.compressed = options.compressed === undefined ? true : options.compressed
  /** @type {Network} */ this.network = options.network || NETWORKS.qredit
}


export async function fromSeed (seed, options) {

  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    seed
  );

  // var hash = bcrypto.sha256(new Buffer(seed,"utf-8"))
  var d = BigInteger.fromBuffer(digest)
  if(d.signum() <= 0 || d.compareTo(N) >= 0){
    throw new Error("seed cannot resolve to a compatible private key")
  }
  else{
    return new ECPair(d, null, options)
  }
}