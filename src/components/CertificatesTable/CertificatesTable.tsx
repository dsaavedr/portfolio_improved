"use client";

import useConfirmationStore from "@/stores/confirmationStore";
import { CertificatesTableProps } from "./CertificatesTable.types";
import { useCallback, useMemo, useTransition } from "react";
import { deleteCertificateAction } from "@/actions/certificates";
import { toast } from "sonner";
import { createColumns } from "./CertificatesColumns";
import DataTable from "../DataTable/DataTable";

const CertificatesTable = ({ certificates }: CertificatesTableProps) => {
  const { openConfirmation } = useConfirmationStore();
  const [isPending, startTransition] = useTransition();

  const onDelete = useCallback(
    async (id: string) => {
      openConfirmation({
        title: "Are you absolutely sure?",
        description:
          "This action cannot be undone. This will permanently delete this certificate record from the server.",
        actionLabel: "Delete",
        onAction: () =>
          startTransition(async () => {
            const { errorMessage } = await deleteCertificateAction(id);

            if (errorMessage) {
              toast.error("Error", {
                description: errorMessage,
              });
            } else {
              toast.success("Success", {
                description: "Certificate successfully deleted.",
              });
            }
          }),
      });
    },
    [openConfirmation],
  );

  const columns = useMemo(() => createColumns({ onDelete }), [onDelete]);

  return (
    <DataTable loading={isPending} columns={columns} data={certificates} />
  );
};

export default CertificatesTable;
