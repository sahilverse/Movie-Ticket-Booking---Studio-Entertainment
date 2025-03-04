import Image from "next/image"
import { Mail, MapPin, Phone, Film, Popcorn, Clapperboard, Sofa, Clock, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import crowd from "@/assets/about/crowd.png"
import theatre from "@/assets/about/theatre.jpg"

export default function About() {
    const features = [
        {
            icon: <Film className="w-10 h-10 text-amber-500" />,
            title: "4K Projection",
            description:
                "Experience movies in stunning clarity with our state-of-the-art 4K laser projectors that deliver vibrant colors and sharp details.",
        },
        {
            icon: <Clapperboard className="w-10 h-10 text-amber-500" />,
            title: "Dolby Atmos",
            description:
                "Immerse yourself in three-dimensional sound that flows all around you, creating a breathtaking audio experience.",
        },
        {
            icon: <Sofa className="w-10 h-10 text-amber-500" />,
            title: "Luxury Seating",
            description:
                "Sink into our premium recliner seats with ample legroom, designed for ultimate comfort throughout your movie.",
        },
        {
            icon: <Popcorn className="w-10 h-10 text-amber-500" />,
            title: "Gourmet Snacks",
            description:
                "Elevate your movie experience with our selection of premium snacks, craft beverages, and freshly prepared treats.",
        },
        {
            icon: <Star className="w-10 h-10 text-amber-500" />,
            title: "Premium Experience",
            description:
                "From the moment you arrive until the credits roll, enjoy personalized service and attention to every detail.",
        },
        {
            icon: <Users className="w-10 h-10 text-amber-500" />,
            title: "Private Screenings",
            description:
                "Book our theaters for private events, corporate functions, or special celebrations with customized packages.",
        },
    ]

    const schedules = [
        { day: "Monday - Thursday", hours: "9:00 AM - 11:00 PM" },
        { day: "Friday - Sunday", hours: "9:00 AM - 12:00 AM" },
        { day: "Public Holidays", hours: "9:00 AM - 12:00 AM" },
    ]

    return (
        <div className="font-poppins">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={theatre}
                    alt="Cinema interior"
                    fill
                    priority
                    className="object-cover object-center brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight text-white">
                        Experience Cinema <span className="text-amber-500">at its Finest</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed">
                        Where technology meets comfort to create unforgettable movie moments
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 px-4 main_container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                        <Image
                            src={crowd}
                            alt="Cinema auditorium"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-amber-500 font-medium mb-2 tracking-wide">OUR STORY</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Redefining the Cinema Experience Since 2010
                            </h3>
                        </div>
                        <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                            <p>
                                Studio Entertainment was born from a passion to create more than just a place to watch movies—we wanted
                                to craft an experience that captivates all your senses.
                            </p>
                            <p>
                                Our journey began with a simple vision: to combine cutting-edge technology with exceptional comfort and
                                service. Today, we're proud to be Kathmandu's premier destination for film enthusiasts and casual
                                moviegoers alike.
                            </p>
                            <p>
                                Every detail in our cinema has been thoughtfully designed to enhance your movie experience, from our
                                advanced projection systems to our carefully curated menu of refreshments.
                            </p>
                        </div>
                        <Link href="/">
                            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-6 text-lg mt-4">
                                Explore Movies
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 bg-zinc-900">
                <div className="main_container">
                    <div className="text-center mb-16">
                        <h2 className="text-amber-500 font-medium mb-2 tracking-wide">WHAT WE OFFER</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Premium Cinema Features</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,159,11,0.15)]"
                            >
                                <div className="mb-6">{feature.icon}</div>
                                <h4 className="text-xl font-semibold mb-3 text-white">{feature.title}</h4>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Hours Section */}
            <section className="py-16 md:py-24 px-4 main_container">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-amber-500 font-medium mb-2 tracking-wide">GET IN TOUCH</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Contact Information</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-zinc-800 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Location</h4>
                                    <p className="text-zinc-400">123 Cinema Street</p>
                                    <p className="text-zinc-400">Kathmandu, Nepal</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-zinc-800 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                                    <p className="text-zinc-400">+977 9612345678</p>
                                    <p className="text-zinc-400">01-4567890</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-zinc-800 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Email</h4>
                                    <p className="text-zinc-400">info@studioentertainment.com</p>
                                    <p className="text-zinc-400">booking@studioentertainment.com</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Opening Hours & Map */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-amber-500 font-medium mb-2 tracking-wide">VISIT US</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Opening Hours</h3>
                        </div>

                        <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="bg-zinc-700 p-3 rounded-full">
                                    <Clock className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                                    <p className="text-zinc-400">Box office opens 30 minutes before first show</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                {schedules.map((schedule, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center pb-4 border-b border-zinc-700 last:border-0"
                                    >
                                        <span className="font-medium text-white">{schedule.day}</span>
                                        <span className="text-amber-500 font-medium">{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[300px] rounded-xl overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1060.0344339550254!2d87.27338590740452!3d26.663954991097356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6c66e80fbfa9%3A0x38094d1a7c974283!2sItahari!5e0!3m2!1sen!2snp!4v1741103194619!5m2!1sen!2snp" width="600" height="450" style={{ border: '0' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-zinc-900">
                <div className="main_container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto leading-tight">
                        Ready to Experience the Magic of Cinema?
                    </h2>
                    <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Book your tickets now and immerse yourself in the ultimate movie experience at Studio Entertainment.
                    </p>
                    <Link href="/">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-6 text-lg">
                            Book Tickets Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

