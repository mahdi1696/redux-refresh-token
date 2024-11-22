import { useLocation } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  const { state } = useLocation();

  return (
    <div className="p-4">
      <p>Home</p>
      <p>{state}</p>
    </div>
  );
}
