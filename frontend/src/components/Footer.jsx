import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-400">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center text-lg sm:text-xt font-semibold
      dark:text-white whitespace-nowrap"
            >
              <span
                className="px-2 py1 bg-gradient-to-r from-purple-400
        via-red-300 to-pink-400 rounded-lg text-white"
              >
                Angel's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://medium.com/@abenaafrakumah/launching-into-the-unknown-a-novices-primer-on-technical-product-management-3d2c6197cdab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  medium blog
                </Footer.Link>
                {/* open href in new tab and no blocking */}
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Angel's Trial Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Afrakumah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                {/* open href in new tab and no blocking */}
                <Footer.Link
                  href="https://twitter.com/_abenaafrakumah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                {/* open href in new tab and no blocking */}
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* copyright and social icons. using date method so copyright will be changing */}
        <Footer.Divider />
          <div className="w-full sm:flex sm:items-center justify-between">
            <Footer.Copyright
              href="#"
              by="Angel's Trial"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="https://github.com/Afrakumah" icon={BsGithub} />
            </div>
          </div>
      </div>
    </Footer>
  );
}
