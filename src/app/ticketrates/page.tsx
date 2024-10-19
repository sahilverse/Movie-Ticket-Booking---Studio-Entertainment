import React from "react";


export default function TicketRates() {
    return (
        <main className="main_container py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Ticket Rates</h1>
            <p className="mb-4">
                Ticket rates for Studio Entertainment are as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Weekdays: $10</li>
                <li>Weekends: $15</li>
                <li>Public Holidays: $20</li>
            </ul>
        </main>
    )
}