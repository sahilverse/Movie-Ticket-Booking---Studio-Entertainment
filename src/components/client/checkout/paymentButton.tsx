"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, TriangleAlert } from "lucide-react"
import Spinner from "@/components/spinner/Spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PaymentMethod } from "@prisma/client"
import { EsewaResponse } from "@/types/types"


interface PaymentButtonProps {
    bookingId: string

}

export function PaymentButton({ bookingId }: PaymentButtonProps) {
    const [isPending, startTransiion] = useTransition();
    const [error, setError] = useState<string | null>(null)


    const handlePayment = () => {

        startTransiion(async () => {
            try {
                const response = await fetch("/api/initiate-payment", {
                    method: "POST",
                    body: JSON.stringify({ bookingId, method: PaymentMethod.ESEWA }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (!response.ok) {
                    throw new Error(`Payment initiation failed: ${response.statusText}`);
                }

                const paymentData: EsewaResponse = await response.json();


                const form = document.createElement("form");
                form.method = "POST";
                form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

                const esewaPayload = {
                    amount: paymentData.amount,
                    tax_amount: paymentData.esewaConfig.tax_amount,
                    total_amount: paymentData.esewaConfig.total_amount,
                    transaction_uuid: paymentData.esewaConfig.transaction_uuid,
                    product_code: paymentData.esewaConfig.product_code,
                    product_service_charge: paymentData.esewaConfig.product_service_charge,
                    product_delivery_charge: paymentData.esewaConfig.product_delivery_charge,
                    success_url: paymentData.esewaConfig.success_url,
                    failure_url: paymentData.esewaConfig.failure_url,
                    signed_field_names: paymentData.esewaConfig.signed_field_names,
                    signature: paymentData.esewaConfig.signature,
                };
              
                Object.entries(esewaPayload).forEach(([key, value]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = String(value);
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();

                form.remove();


            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                console.error("Payment error:", errorMessage);
                setError("Payment initiation failed. Please try again.");

            }



        })

    }

    return (
        <div className={`w-full space-y-4 `}>
            {error && (
                <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
                    <AlertTitle className="mb-2 flex gap-2 items-center font-poppins tracking-wide"><span><TriangleAlert className="w-5" /></span>Payment Error</AlertTitle>
                    <AlertDescription className="font-poppins tracking-wide leading-[25px]">{error}</AlertDescription>
                </Alert>
            )}

            <Button
                className=" bg-amber-500 hover:bg-amber-600 text-black font-bold w-full"
                onClick={handlePayment}
                disabled={isPending}
            >
                <CreditCard className="mr-2 h-4 w-4 " />
                {isPending ? <span className="flex gap-2 font-roboto tracking-wide">
                    <Spinner />
                    Processing...
                </span>
                    :
                    <span className="font-roboto tracking-wider">
                        Proceed to Payment
                    </span>
                }

            </Button>

        </div>
    )
}

