export default function TicketRates() {
    const domesticMovies = [
        { class: 'Classy', morning1: 150, normal1: 200, morning2: 150, normal2: '', morning3: 150, normal3: 200 },
        { class: 'Executive', morning1: 150, normal1: 200, morning2: 150, normal2: '', morning3: 150, normal3: 280 },
        { class: 'Premium', morning1: 400, normal1: '', morning2: 400, normal2: '', morning3: 490, normal3: '' },
        { class: 'Business', morning1: 650, normal1: '', morning2: 650, normal2: '', morning3: 750, normal3: '' },
    ]

    const internationalMovies = [
        { class: 'Classy', morning1: 150, normal1: 200, morning2: 150, normal2: '', morning3: 150, normal3: 200 },
        { class: 'Executive', morning1: 150, normal1: 250, morning2: 150, normal2: '', morning3: 150, normal3: 300 },
        { class: 'Premium', morning1: 400, normal1: '', morning2: 400, normal2: '', morning3: 490, normal3: '' },
        { class: 'Business', morning1: 650, normal1: '', morning2: 650, normal2: '', morning3: 750, normal3: '' },
    ]

    return (
        <div className="min-h-screen  text-white mt-10  main_container">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Domestic Movies Section */}
                <section>
                    <h2 className="text-2xl font-medium mb-6">Domestic Movies</h2>

                    {/* Mobile View */}
                    <div className="grid gap-4 md:hidden">
                        {domesticMovies.map((item, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded-lg space-y-4">
                                <h3 className="text-lg font-medium">{item.class}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-[#efae26] text-sm mb-2">Weekdays (Mon-Thu)</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <div className="text-gray-400">Morning</div>
                                                {item.morning1 && <div>Rs. {item.morning1}</div>}
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Normal</div>
                                                {item.normal1 && <div>Rs. {item.normal1}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[#efae26] text-sm mb-2">Weekdays (Mon-Thu)</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <div className="text-gray-400">Morning</div>
                                                {item.morning3 && <div>Rs. {item.morning3}</div>}
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Normal</div>
                                                {item.normal3 && <div>Rs. {item.normal3}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left text-[#efae26] font-normal py-4 pr-4">Class</th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-2"></th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {domesticMovies.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-4">{item.class}</td>
                                        <td>Rs. {item.morning1}</td>
                                        <td>{item.normal1 && `Rs. ${item.normal1}`}</td>
                                        <td>Rs. {item.morning2}</td>
                                        <td>{item.normal2}</td>
                                        <td>Rs. {item.morning3}</td>
                                        <td>{item.normal3 && `Rs. ${item.normal3}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* International Movies Section */}
                <section>
                    <h2 className="text-2xl font-medium mb-6">International Movies</h2>

                    {/* Mobile View */}
                    <div className="grid gap-4 md:hidden">
                        {internationalMovies.map((item, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded-lg space-y-4">
                                <h3 className="text-lg font-medium">{item.class}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-[#efae26] text-sm mb-2">Weekdays (Mon-Thu)</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <div className="text-gray-400">Morning</div>
                                                {item.morning1 && <div>Rs. {item.morning1}</div>}
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Normal</div>
                                                {item.normal1 && <div>Rs. {item.normal1}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[#efae26] text-sm mb-2">Weekdays (Mon-Thu)</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <div className="text-gray-400">Morning</div>
                                                {item.morning3 && <div>Rs. {item.morning3}</div>}
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Normal</div>
                                                {item.normal3 && <div>Rs. {item.normal3}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left text-[#efae26] font-normal py-4 pr-4">Class</th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                    <th className="text-left text-[#efae26] font-normal py-4" colSpan={2}>
                                        Weekdays (Mon-Thu)
                                    </th>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-2"></th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                    <th className="text-left py-2">Morning</th>
                                    <th className="text-left py-2">Normal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {internationalMovies.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-4">{item.class}</td>
                                        <td>Rs. {item.morning1}</td>
                                        <td>{item.normal1 && `Rs. ${item.normal1}`}</td>
                                        <td>Rs. {item.morning2}</td>
                                        <td>{item.normal2}</td>
                                        <td>Rs. {item.morning3}</td>
                                        <td>{item.normal3 && `Rs. ${item.normal3}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Footer Notes */}
                <section className="mt-8 space-y-2 text-sm">
                    <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                        <p>For 3D Movies it cost Rs. 50 Extra.</p>
                        <p>Price for New Released Movie will be same as Weekends (Fri-Sat-Sun)</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="font-medium">NOTE :-</span>
                            <span className="text-[#efae26]">FOR ADVANCE BOOKING :- +977 9812345678</span>
                        </div>
                        <p>Tickets once sold are neither refundable nor exchangeable.</p>
                        <p>Kindly note that schedule & tickets price are subject to change by Management decision.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}