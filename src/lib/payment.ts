import { PaymentResponse } from '@/types/types';
import * as crypto from 'crypto';


export function generateEsewaSignature(message: string) {
    const secret = process.env.ESEWA_SECRET!;


    const hash = crypto.createHmac("sha256", secret).update(message).digest("base64");

    return hash;

};


export function verifyEsewaPayment(responseData: PaymentResponse): boolean {
    try {
        // Extract the signature and signed field names
        const receivedSignature = responseData.signature;
        const signedFieldNames = responseData.signed_field_names.split(',');

        const mappedFields = signedFieldNames.map(field => `${field}=${responseData[field]}`).join(',');

        // Calculate the expected signature
        const calculatedSignature = generateEsewaSignature(mappedFields);


        // Compare signatures

        return (calculatedSignature === receivedSignature);
    } catch (error) {
        console.error("Error verifying eSewa payment:", error)
        return false;
    }
}
