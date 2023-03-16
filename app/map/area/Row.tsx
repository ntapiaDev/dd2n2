import Cell from "./Cell";
import { CellType } from '@/app/types/Cell';

export default function Row({ row }: { row: CellType[] }) {

  const cells = row.map((cell, i: number) => (
    <Cell key={i} cell={cell} />
  ));

  return <tr>{cells}</tr>;
}
