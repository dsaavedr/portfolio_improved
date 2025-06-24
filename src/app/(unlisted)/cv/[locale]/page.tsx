import { getExperiences } from "@/actions/experiences";
import { CVProps, locale } from "./types";
import { locales, titles } from "./utils";
import { getCertificates } from "@/actions/certificates";
import { getSkills } from "@/actions/skills";
import { Certificate, Experience, Skill } from "@prisma/client";
import { sortByProperty } from "@/lib/utils";
import { LinkIcon, MailIcon, MapPinIcon, SmartphoneIcon } from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen, faGithub } from "@fortawesome/free-brands-svg-icons";

const page = async ({ params }: CVProps) => {
  const localeParam = (await params).locale;

  let locale: locale;

  if (
    !localeParam ||
    !Object.keys(locales).includes(localeParam.toLowerCase())
  ) {
    locale = "en";
  } else {
    locale = localeParam as locale;
  }

  const [experiencesResult, certificatesResult, skillsResult] =
    await Promise.all<
      [
        ReturnType<typeof getExperiences>,
        ReturnType<typeof getCertificates>,
        ReturnType<typeof getSkills>,
      ]
    >([getExperiences(), getCertificates(), getSkills()]);

  if (
    "errorMessage" in experiencesResult ||
    "errorMessage" in certificatesResult ||
    "errorMessage" in skillsResult
  ) {
    throw new Error("Couldn't fetch complete data.");
  }

  const [experiences, certificates, skills] = [
    experiencesResult.experiences,
    certificatesResult.certificates,
    skillsResult.skills,
  ];

  experiences.sort(sortByProperty<Experience>("startDate"));
  certificates.sort(sortByProperty<Certificate>("date"));
  skills.sort(sortByProperty<Skill>("name"));

  return (
    <div
      className="mx-auto flex min-h-[594mm] max-w-[210mm] text-sm shadow-2xl"
      id="wrapper"
    >
      <div
        id="sidebar"
        className="max-w-1/3 bg-blue-500 px-3 py-5 text-gray-100"
      >
        <div id="sidebar-header" className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Daniel Saavedra</h1>
          <h2 className="mb-5 text-xl font-semibold">{titles.role[locale]}</h2>
        </div>
        <div id="sidebar-info">
          <ul className="flex flex-col justify-between gap-2 text-xs [&_li]:flex [&_li]:items-center [&_li]:justify-center [&_li]:gap-2 [&_svg]:h-5 [&_svg]:w-5">
            <li>
              <MapPinIcon />
              <span>Bogotá, Colombia</span>
            </li>
            <li>
              <SmartphoneIcon />
              <Link href="tel:+573183250778">+57 318 325 0778</Link>
            </li>
            <li>
              <MailIcon />
              <Link href="mailto:danielsaavedram@hotmail.com">
                danielsaavedram@hotmail.com
              </Link>
            </li>
            <div className="flex items-center justify-center gap-4">
              <li>
                <Link href="https://dsaavedr.netlify.app/">
                  <LinkIcon />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/dsaavedr">
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
              </li>
              <li>
                <Link href="https://codepen.io/dsaavedr">
                  <FontAwesomeIcon icon={faCodepen} />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
