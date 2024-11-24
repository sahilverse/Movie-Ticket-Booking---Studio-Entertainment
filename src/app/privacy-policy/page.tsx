/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <Card className=" shadow-xl bg-[#111111]  border-none">
                    <CardHeader className="">
                        <CardTitle className="text-3xl font-bold text-center text-white">
                            Privacy Policy for Studio Entertainment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 text-white ">
                        <p className="text-justify">
                            We at Studio Entertainment take our customers’ data seriously. The data we collect through mobile App and websites are property of Studio Entertainment only. The protection of your personal information and all the content you store on our service are well secured and are not disclosed to any third party. This privacy policy explains our practices for gathering, using, and disclosing the personal data of App and website visitors.
                        </p>
                        <p>
                            By utilizing our Service, you consent to the gathering and utilization of information as outlined in this
                            policy. The Personal Information we gather is employed to enhance and provide the Service. We pledge not to
                            employ or distribute your information to any party except as detailed in this Privacy Policy.
                        </p>

                        <p>
                            The terms mentioned in this Privacy Policy have the same meanings as those detailed in our Terms and
                            Conditions, accessible on the Studio Entertainment platform, unless explicitly defined differently in this Privacy
                            Policy.
                        </p>

                        <Separator className="my-6" />

                        <section className="text-white">
                            <h2 className="text-2xl font-bold mb-3">Information Collection and Use</h2>
                            <p>
                                To enhance your experience with our Service, we may need you to provide specific personally identifiable
                                information. Any information we ask for will be kept by us and utilized in accordance with this privacy
                                policy.
                            </p>
                            <p className="mt-2">
                                The application does use third-party services that might collect information used to identify you.
                            </p>

                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Log Data</h2>
                            <p>
                                Whenever you utilize our Service and encounter an app error, we gather data and information (through
                                third-party products) on your device, referred to as Log Data. This Log Data may encompass details such as
                                your device's Internet Protocol ("IP") address, device name, operating system version, the setup of the app
                                during your Service usage, the time and date of your Service usage, and additional statistics.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Cookies</h2>
                            <p>
                                Cookies are small data files commonly utilized as anonymous unique identifiers. They are transmitted to your
                                browser from the websites you visit and are stored in your device's internal memory.
                            </p>
                            <p className="mt-2">
                                This Service doesn't directly employ these "cookies." Nevertheless, the app might utilize third-party code
                                and libraries that utilize "cookies" to gather information and improve their services. You have the choice
                                to accept or decline these cookies and receive notifications when a cookie is being sent to your device. If
                                you opt to decline our cookies, some parts of this Service may not be accessible to you.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Service Providers</h2>
                            <p>
                                We might enlist the help of third-party companies and individuals for the following purposes:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Facilitating our Service;</li>
                                <li>Providing the Service on our behalf;</li>
                                <li>Performing Service-related tasks; or</li>
                                <li>Assisting us in analyzing how our Service is utilized.</li>
                            </ul>
                            <p className="mt-2">
                                We'd like to notify users of this Service that these third parties have access to their Personal
                                Information. This access is granted to enable them to perform tasks delegated to them on our behalf.
                                However, they are bound by obligation not to disclose or utilize the information for any other purpose.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Security</h2>
                            <p>
                                We appreciate your trust in sharing your Personal Information with us. Hence, we endeavor to employ
                                commercially acceptable methods to safeguard it. However, it's important to note that no method of
                                transmission over the internet or electronic storage is entirely secure and reliable, and we cannot
                                guarantee its absolute security.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Links to Other Websites</h2>
                            <p>
                                This Service might include links to other websites. Clicking on a third-party link will redirect you to that
                                site. It's important to note that these external sites are not operated by us. Therefore, we strongly
                                recommend reviewing the Privacy Policy of these websites. We have no control over the content, privacy
                                policies, or practices of any third-party sites or services and assume no responsibility for them.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Children's Privacy</h2>
                            <p>
                                These Services are not designed for individuals under the age of 13. We do not knowingly gather personally
                                identifiable information from children under 13 years old. If we discover that a child under 13 has provided
                                us with personal information, we will promptly remove it from our servers. If you are a parent or guardian
                                and are aware that your child has provided us with personal information, please contact us so we can take
                                appropriate action.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Changes to This Privacy Policy</h2>
                            <p>
                                We may periodically update our Privacy Policy. Hence, we recommend that you check this page regularly for
                                any changes. We will notify you of any updates by posting the revised Privacy Policy on this page.
                            </p>
                            <p className="mt-2">
                                This policy is effective as of May 15, 2024.
                            </p>
                        </section>

                        <Separator className="my-6" />

                        <section>
                            <h2 className="text-2xl font-bold mb-3  ">Contact Us</h2>
                            <p>
                                If you have any questions or suggestions regarding our Privacy Policy, feel free to contact us at:
                            </p>
                            <p className="mt-2">
                                Phone: +977 9812345678<br />
                                Email: contact@studioentertainment.com
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}