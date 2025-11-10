import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-white">
      {/* This div creates the space for the content to overlap */}
      <div className="h-24 bg-background"></div>

      <div className="relative bg-gray-800 pt-12">
        <div className="container mx-auto px-4">
          {/* Main footer content with negative margin to create the overlap effect */}
          <div className="relative -mt-36 rounded-lg bg-gray-50 p-8 shadow-xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Column 1: Brand and Contact Info */}
              <div className="lg:col-span-2">
                <h3 className="mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  EBIN TAXI
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Leveraging agile frameworks to provide a robust synopsis for
                  strategic, collaborative thinking to further the overall value
                  proposition.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-primary">Email</p>
                      <a
                        href="mailto:EbinTaxi@gmail.com"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        EbinTaxi@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-primary">Call Us</p>
                      <p className="text-muted-foreground">
                        010 23 1010 / 079 643 5050
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="mb-4 text-lg bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 font-semibold">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Our Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Utility Pages */}
              <div>
                <h4 className="mb-4 text-lg bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 font-semibold">
                  Utility Pages
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Style Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Changelog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Licenses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Protected
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      Not Found
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-6 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/admin" className="hover:text-white">
                Ebin Taxi.
              </Link>{" "}
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
