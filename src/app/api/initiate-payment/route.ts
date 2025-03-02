'use server';

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { generateEsewaSignature } from "@/lib/payment";
import { PaymentMethod } from "@prisma/client";
import { PaymentRequestData } from "@/types/types";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function validateEnvironmentVariables() {
    const requiredEnvVars = [
        "NEXT_PUBLIC_API_URL",
        "ESEWA_MERCHANT_CODE",
        "ESEWA_SECRET",
    ];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    }
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(req: Request) {
    console.log("Received POST request to /api/initiate-payment");
    try {
        validateEnvironmentVariables();
        const user = await currentUser();
        const paymentData: PaymentRequestData = await req.json();

        const { bookingId, method } = paymentData;

        if (!bookingId || !method) {
            console.error("Missing required fields:", paymentData);
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId, userId: user.id }
        })

        if (!booking) {
            console.error("Booking not found:", bookingId);
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        const amount = booking.amount;



        switch (method as PaymentMethod) {
            case PaymentMethod.ESEWA: {
                console.log("Initiating eSewa payment");
                const transactionUuid = `${Date.now()}-${uuidv4()}`;
                const esewaConfig = {
                    amount: amount,
                    tax_amount: "0",
                    total_amount: amount,
                    transaction_uuid: transactionUuid,
                    product_code: process.env.ESEWA_MERCHANT_CODE,
                    product_service_charge: "0",
                    product_delivery_charge: "0",
                    success_url: `${baseUrl}/payment/success`,
                    failure_url: `${baseUrl}/payment/failure`,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                };

                const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
                const signature = generateEsewaSignature(
                    process.env.ESEWA_SECRET!,
                    signatureString
                );

                console.log("eSewa config:", { ...esewaConfig, signature });

                const payment = await prisma.payment.upsert({
                    where: { bookingId },
                    update: {
                        amount: amount,
                        method: PaymentMethod.ESEWA,
                        status: "PENDING",
                        transactionUuid,

                    },
                    create: {
                        bookingId,
                        amount: amount,
                        method: PaymentMethod.ESEWA,
                        status: "PENDING",
                        transactionUuid,
                    },
                });


                return NextResponse.json({
                    amount: amount,
                    esewaConfig: {
                        ...esewaConfig,
                        signature,
                        product_service_charge: Number(esewaConfig.product_service_charge),
                        product_delivery_charge: Number(
                            esewaConfig.product_delivery_charge
                        ),
                        tax_amount: Number(esewaConfig.tax_amount),
                        total_amount: Number(esewaConfig.total_amount),
                    },

                });
            }
            case PaymentMethod.CASH: {
                console.log("Received Payment Through the Cash");

            }
            default:
                console.error("Invalid payment method:", method);
                return NextResponse.json(
                    { error: "Invalid payment method" },
                    { status: 400 }
                );
        }
    } catch (err) {
        console.error("Payment API Error:", err);
        return NextResponse.json(
            {
                error: "Error creating payment session",
                details: err instanceof Error ? err.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}