import Cell from "./Cell";

export default function Row({ values }) {
  
    const cells = values.map((value, index) => (
        <Cell key={index} value={value} />
      ));
    
      return <tr>{cells}</tr>;
}
