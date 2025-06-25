import { getExperiences } from "@/actions/experiences";
import { CVProps, locale } from "./types";
import { locales, summary, titles } from "./utils";
import { getCertificates } from "@/actions/certificates";
import { getSkills } from "@/actions/skills";
import { Certificate, Experience, Skill, SkillType } from "@prisma/client";
import { capitalizeWords, sortByProperty } from "@/lib/utils";
import { LinkIcon, MailIcon, MapPinIcon, SmartphoneIcon } from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen, faGithub } from "@fortawesome/free-brands-svg-icons";
import Title from "@/components/CV/Title";
import Separator from "@/components/CV/Separator";
import CVSkillList from "@/components/CV/CVSkillList";
import { format } from "date-fns";

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

  if ("errorMessage" in experiencesResult)
    throw new Error(`Failed to fetch data: ${experiencesResult.errorMessage}`);
  if ("errorMessage" in certificatesResult)
    throw new Error(`Failed to fetch data: ${certificatesResult.errorMessage}`);
  if ("errorMessage" in skillsResult)
    throw new Error(`Failed to fetch data: ${skillsResult.errorMessage}`);

  const [experiences, certificates, skills] = [
    experiencesResult.experiences,
    certificatesResult.certificates,
    skillsResult.skills,
  ];

  experiences.sort(sortByProperty<Experience>("startDate"));
  certificates.sort(sortByProperty<Certificate>("date"));
  skills.sort(sortByProperty<Skill>("name", true));

  return (
    <div
      className="bg-background mx-auto flex min-h-[594mm] max-w-[210mm] text-sm shadow-2xl"
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
        <div
          id="sidebar-info"
          className="[&_h4]:mb-1 [&_h4]:font-semibold [&_h4]:italic"
        >
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
          <Title>
            <h3 className="text-lg font-semibold">{titles.skills[locale]}</h3>
            <Separator />
          </Title>
          <h4>{capitalizeWords(SkillType.FRONT_END)}</h4>
          <CVSkillList
            skills={skills.filter((el) => el.type === SkillType.FRONT_END)}
          />
          <h4>{capitalizeWords(SkillType.BACK_END)}</h4>
          <CVSkillList
            skills={skills.filter((el) => el.type === SkillType.BACK_END)}
          />
          <h4>{capitalizeWords(SkillType.DEV_OPS).split(" ").join("")}</h4>
          <CVSkillList
            skills={skills.filter((el) => el.type === SkillType.DEV_OPS)}
          />
          <h4>{capitalizeWords(SkillType.MISCELLANEOUS)}</h4>
          <CVSkillList
            skills={skills.filter((el) => el.type === SkillType.MISCELLANEOUS)}
          />
          <Title>
            <h3 className="text-lg font-semibold">
              {titles.certifications[locale]}
            </h3>
            <Separator />
          </Title>
          {certificates.map((cert) => (
            <div className="mb-3" key={cert.id}>
              <h5>{cert.title}</h5>
              <p className="text-xs">{cert.source}</p>
              <p className="text-xs">{format(cert.date, "MMM/yyy")}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="content" className="w-full p-5 leading-tight">
        <Title className="mt-0">
          <Separator />
          <h2 className="text-xl font-semibold">{titles.summary[locale]}</h2>
          <Separator />
        </Title>
        <div className="mb-5 text-justify">{summary[locale]}</div>
        <Title>
          <h3 className="text-lg font-semibold">{titles.experience[locale]}</h3>
          <Separator />
        </Title>
        {experiences.map((exp) => (
          <div className="mb-5" key={exp.id}>
            <h4 className="font-semibold italic">
              {exp.role[locale] || exp.role.en} {titles.at[locale]}{" "}
              {exp.company}
            </h4>
            <p>
              {format(exp.startDate, "MMM/yyy")} -{" "}
              {exp.endDate
                ? format(exp.endDate, "MMM/yyy")
                : { en: "ongoing", es: "presente" }[locale]}
            </p>
            <p className="mb-2">{exp.location}</p>
            <p className="mb-2 text-justify">{exp.description[locale]}</p>
            <ul className="list-disc pl-5">
              {exp.responsibilities.map((res, idx) => (
                <li className="text-justify" key={`${exp.id}-${idx}`}>
                  {res[locale]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
