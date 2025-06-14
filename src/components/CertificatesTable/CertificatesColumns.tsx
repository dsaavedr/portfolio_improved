import { MoreHorizontalIcon } from "lucide-react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { toast } from "sonner";
import Link from "next/link";
import { CreateColumnsProps, ICertificate } from "./CertificatesTable.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { format } from "date-fns";

const columnHelper = createColumnHelper<ICertificate>();

export const createColumns = ({ onDelete }: CreateColumnsProps) => {
  const onCopyId = async (id: string) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success("ID copied to clipboard");
      })
      .catch((err) => {
        toast.error("Error", {
          description: err,
        });
      });
  };

  return [
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onCopyId(data.id)}>
                Copy Certificate ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/certificates/edit/${data.id}`}>
                  Edit Certificate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(data.id)}
              >
                Delete Certificate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("source", {
      header: "Source",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => format(info.getValue(), "MMM/yyy"),
    }),
  ] as Array<ColumnDef<ICertificate, unknown>>;
};
