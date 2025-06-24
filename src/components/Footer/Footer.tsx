import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodepen,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { CopyrightIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent w-full py-10">
      <div className="container mx-auto space-y-10">
        <div>
          <h2 className="mb-1 text-center text-4xl font-semibold uppercase">
            Daniel Saavedra
          </h2>
          <p className="flex items-center justify-center gap-1">
            <CopyrightIcon size={15} />
            <span>2025</span>
          </p>
        </div>
        <ul className="flex items-center justify-center gap-4 font-bold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About me</Link>
          </li>
          <li>
            <Link href="/">My projects</Link>
          </li>
          <li>
            <Link href="/">Contact me</Link>
          </li>
        </ul>
        <ul className="flex items-center justify-center gap-4 [&_svg]:h-8 [&_svg]:w-8">
          <li>
            <Link target="_blank" href="https://github.com/dsaavedr">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://codepen.io/dsaavedr">
              <FontAwesomeIcon icon={faCodepen} />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/daniel-saavedra-988717121/"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          </li>
          <li>
            <Link target="_blank" href="mailto:danielsaavedram@hotmail.com">
              <MailIcon />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
