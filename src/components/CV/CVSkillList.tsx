import { cn } from "@/lib/utils";
import { Skill } from "@prisma/client";

const CVSkillList = ({
  className,
  skills,
}: {
  className?: string;
  skills: Skill[];
}) => {
  return (
    <ul
      className={cn(
        "mb-4 flex flex-wrap items-center gap-x-3 gap-y-1",
        className,
      )}
    >
      {skills.map((el) => (
        <li className="border-b border-gray-300" key={el.name}>
          {el.name}
        </li>
      ))}
    </ul>
  );
};

export default CVSkillList;
