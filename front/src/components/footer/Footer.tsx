import { FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 rounded-t-xl mt-8">
            <div className="container mx-auto px-10 py-10 flex flex-col md:flex-row gap-10 justify-evenly">
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-[#2E50EB]">Home</Link></li>
                        <li><Link href="/products" className="hover:text-[#2E50EB]">Products</Link></li>
                        <li><Link href="/login" className="hover:text-[#2E50EB]">Login</Link></li>
                    </ul>
                </div>

                
                <div>
                    <h4 className="text-lg font-semibold mb-4 ">Follow Us</h4>
                    <div className="flex space-x-4">
                        <Link href="#" target="_blank" className="hover:text-[#2E50EB]">
                            <FaFacebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" target="_blank" className="hover:text-[#2E50EB]">
                            <FaTwitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" target="_blank" className="hover:text-[#2E50EB]">
                            <FaInstagram className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Tech Mobile</h3>
                    <p className="text-sm">
                        Your go-to destination for the latest in smartphones,<br />smart home devices, and tech accessories.
                        <br />
                        Proudly based in Canada 🇨🇦
                    </p>
                </div>
            </div>

          
            <div className="text-center py-4 text-sm border-t border-gray-200 mt-4">
                &copy; {new Date().getFullYear()} Tech Mobile. All rights reserved.
            </div>
        </footer>
    );
}
