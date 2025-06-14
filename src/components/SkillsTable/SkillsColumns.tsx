import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CreateColumnsProps, ISkill } from "./SkillsTable.types";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { capitalizeWords } from "@/lib/utils";

const columnHelper = createColumnHelper<ISkill>();

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
                Copy Skill ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/skills/edit/${data.id}`}>Edit Skill</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(data.id)}
              >
                Delete Skill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      header: "Skill Type",
      cell: (info) => capitalizeWords(info.getValue()),
    }),
  ] as Array<ColumnDef<ISkill, unknown>>;
};
