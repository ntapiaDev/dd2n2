import Area from "./Area";
import { AreaType } from '@/app/types/Area';

export default function Row({ row }: { row: AreaType[] }) {

  const areas = row.map((area, i: number) => (
    <Area key={i} area={area} />
  ));

  return <tr>{areas}</tr>;
}
