"use client";

import { Prisma } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";

type IExperience = Prisma.ExperienceGetPayload<null>;

type createColumnsProps = {
  onDelete: (id: string) => void;
};

const columnHelper = createColumnHelper<IExperience>();

export const createColumns = ({ onDelete }: createColumnsProps) => {
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
        const experience = row.original;

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
              <DropdownMenuItem onClick={() => onCopyId(experience.id)}>
                Copy Experience ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/experiences/edit/${experience.id}`}>
                  Edit Experience
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(experience.id)}
              >
                Delete Experience
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
    columnHelper.accessor("company", {
      cell: (info) => info.getValue(),
      header: "Company",
    }),
    columnHelper.accessor("role", {
      cell: (info) => (
        <div>
          {info.getValue().en} <br /> {info.getValue().es}
        </div>
      ),
      header: "Role",
    }),
    columnHelper.accessor("startDate", {
      cell: (info) =>
        `${info.getValue().getMonth() + 1}/${info.getValue().getFullYear()}`,
      header: "Start Date",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => {
        const value = info.getValue();
        if (!value) return "Ongoing";
        return `${value.getMonth() + 1}/${value.getFullYear()}`;
      },
      header: "End Date",
    }),
    columnHelper.accessor("description.en", {
      enableSorting: false,
      cell: (info) => (
        <div key={info.cell.id} className="min-w-3xs text-wrap">
          {info.getValue()}
        </div>
      ),
      header: "Description (EN)",
    }),
    columnHelper.accessor("description.es", {
      enableSorting: false,
      cell: (info) => (
        <div key={info.cell.id} className="min-w-3xs text-wrap">
          {info.getValue()}
        </div>
      ),
      header: "Description (ES)",
    }),
    columnHelper.accessor("responsibilities", {
      id: "responsibilitiesEn",
      enableSorting: false,
      cell: (info) => {
        const value = info.getValue();
        const listItems = value.map((el, idx) => (
          <li key={`respEn${idx}`}>{el.en}</li>
        ));
        return (
          <ul key={info.cell.id} className="ml-5 min-w-xs list-disc text-wrap">
            {listItems}
          </ul>
        );
      },
      header: "Responsabilities (EN)",
    }),
    columnHelper.accessor("responsibilities", {
      id: "responsibilitiesEs",
      enableSorting: false,
      cell: (info) => {
        const value = info.getValue();
        const listItems = value.map((el, idx) => (
          <li key={`respEs${idx}`}>{el.es}</li>
        ));
        return (
          <ul key={info.cell.id} className="ml-5 min-w-xs list-disc text-wrap">
            {listItems}
          </ul>
        );
      },
      header: "Responsabilities (ES)",
    }),
  ] as Array<ColumnDef<IExperience, unknown>>;
};
