import StudioDetails from "@/components/studios/StudioDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <StudioDetails id={id} />;
}