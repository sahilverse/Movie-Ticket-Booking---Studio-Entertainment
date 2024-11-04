import { Mail, MapPin, Phone, Film, Popcorn, Clapperboard, Sofa } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
    const features = [
        {
            icon: <Film className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-amber-500" />,
            title: "4K Projection",
            description: "Crystal clear picture quality with state-of-the-art 4K projectors"
        },
        {
            icon: <Clapperboard className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-amber-500" />,
            title: "Dolby Atmos",
            description: "Immersive sound experience with latest audio technology"
        },
        {
            icon: <Sofa className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-amber-500" />,
            title: "Luxury Seating",
            description: "Premium recliner seats for ultimate comfort"
        },
        {
            icon: <Popcorn className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-amber-500" />,
            title: "Gourmet Snacks",
            description: "Wide selection of premium snacks and beverages"
        }
    ]

    const contacts = [
        {
            icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-amber-500" />,
            title: "Location",
            details: ["123 Cinema Street", "Kathmandu, Nepal"]
        },
        {
            icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-amber-500" />,
            title: "Phone",
            details: ["+977 9612345678", "01-4567890"]
        },
        {
            icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-amber-500" />,
            title: "Email",
            details: ["info@studioentertainment.com", "booking@studioentertainment.com"]
        }
    ]

    const schedules = [
        { day: "Monday - Thursday", hours: "9:00 AM - 11:00 PM" },
        { day: "Friday - Sunday", hours: "9:00 AM - 12:00 AM" },
        { day: "Public Holidays", hours: "9:00 AM - 12:00 AM" }
    ]
    return (
        <div className="min-h-screen  text-white main_container mt-10">
            {/* Hero Section */}
            <section className="relative h-[30vh] sm:h-[40vh] min-h-[300px] w-full overflow-hidde ">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
                <div
                    className="absolute inset-0  bg-cover bg-center"
                    aria-hidden="true"
                />
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                        Studio Entertainment
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#efae26]">
                        Experience Cinema at its Finest
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">About Us</h2>
                <div className="space-y-4 sm:space-y-6 text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
                    <p className="leading-relaxed">
                        Welcome to Studio Entertainment, where cinema comes alive. Established with a passion for
                        delivering exceptional movie experiences, we have been serving movie enthusiasts since 2010.
                    </p>
                    <p className="leading-relaxed">
                        Our state-of-the-art facility combines cutting-edge technology with comfort and luxury,
                        ensuring every visit is memorable. From crystal-clear projection to immersive sound
                        systems, we've invested in the best to bring you unparalleled entertainment.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900 rounded-md">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="bg-gray-800 border-gray-700 transition-transform hover:scale-105">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex flex-col items-center text-center">
                                        {feature.icon}
                                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto ">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Contact Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {contacts.map((contact, index) => (
                        <Card key={index} className="bg-gray-800 border-gray-700 transition-transform hover:scale-105">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col items-center text-center">
                                    {contact.icon}
                                    <h3 className="text-base sm:text-lg font-semibold mb-2">{contact.title}</h3>
                                    {contact.details.map((detail, idx) => (
                                        <p key={idx} className="text-sm sm:text-base text-gray-400">{detail}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Opening Hours */}
            <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900 rounded-md">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Opening Hours</h2>
                    <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 sm:p-8">
                        <div className="space-y-3 text-sm sm:text-base text-gray-300">
                            {schedules.map((schedule, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="font-medium">{schedule.day}</span>
                                    <span>{schedule.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}