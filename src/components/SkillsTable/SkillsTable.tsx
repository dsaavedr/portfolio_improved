"use client";

import useConfirmationStore from "@/stores/confirmationStore";
import { SkillsTableProps } from "./SkillsTable.types";
import { useCallback, useMemo, useTransition } from "react";
import { deleteSkillAction } from "@/actions/skills";
import { toast } from "sonner";
import { createColumns } from "./SkillsColumns";
import DataTable from "../DataTable/DataTable";

const SkillsTable = ({ skills }: SkillsTableProps) => {
  const { openConfirmation } = useConfirmationStore();
  const [isPending, startTransition] = useTransition();

  const onDelete = useCallback(
    async (id: string) => {
      openConfirmation({
        title: "Are you absolutely sure?",
        description:
          "This action cannot be undone. This will permanently delete this skill record from the server.",
        actionLabel: "Delete",
        onAction: () =>
          startTransition(async () => {
            const { errorMessage } = await deleteSkillAction(id);

            if (errorMessage) {
              toast.error("Error", {
                description: errorMessage,
              });
            } else {
              toast.success("Success", {
                description: "Skill successfully deleted.",
              });
            }
          }),
      });
    },
    [openConfirmation],
  );

  const columns = useMemo(() => createColumns({ onDelete }), [onDelete]);

  return <DataTable loading={isPending} columns={columns} data={skills} />;
};

export default SkillsTable;
