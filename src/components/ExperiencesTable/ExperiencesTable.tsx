"use client";

import { Prisma } from "@prisma/client";
import DataTable from "../DataTable/DataTable";
import { deleteExperienceAction } from "@/actions/experiences";
import { toast } from "sonner";
import { useCallback, useMemo, useTransition } from "react";
import { createColumns } from "./ExperiencesColumns";
import useConfirmationStore from "@/stores/confirmationStore";

type Props = {
  experiences: Prisma.ExperienceGetPayload<null>[];
};

const ExperiencesTable = ({ experiences }: Props) => {
  const { openConfirmation } = useConfirmationStore();
  const [isPending, startTransition] = useTransition();

  const onDelete = useCallback(
    async (id: string) => {
      openConfirmation({
        title: "Are you absolutely sure?",
        description:
          "This action cannot be undone. This will permanently delete this experience record from the server.",
        actionLabel: "Delete",
        onAction: () =>
          startTransition(async () => {
            const { errorMessage } = await deleteExperienceAction(id);

            if (errorMessage) {
              toast.error("Error", {
                description: errorMessage,
              });
            } else {
              toast.success("Success", {
                description: "Experience successfully deleted.",
              });
            }
          }),
      });
    },
    [openConfirmation],
  );

  const columns = useMemo(() => createColumns({ onDelete }), [onDelete]);

  return <DataTable loading={isPending} columns={columns} data={experiences} />;
};

export default ExperiencesTable;
