import { Prisma } from "@prisma/client";

export type ISkill = Prisma.SkillGetPayload<null>;

export type SkillsTableProps = {
  skills: ISkill[];
};

export type CreateColumnsProps = {
  onDelete: (id: string) => void;
};
