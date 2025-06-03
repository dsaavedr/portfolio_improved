import ExperiencesForm from "@/components/ExperiencesForm/EsperiencesForm";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ExperiencesForm id={id} />
    </div>
  );
};

export default page;
