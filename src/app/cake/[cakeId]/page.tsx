type Props = {
  params: { cakeId: string };
};

async function CakePage({ params: { cakeId } }: Props) {
  return <h1>{cakeId}</h1>;
}

export default CakePage;
