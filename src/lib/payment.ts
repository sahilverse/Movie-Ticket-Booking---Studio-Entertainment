import * as crypto from 'crypto';

export function generateEsewaSignature(secret: string, message: string) {

    const hash = crypto.createHmac("sha256", secret).update(message).digest("base64");

    return hash;

};