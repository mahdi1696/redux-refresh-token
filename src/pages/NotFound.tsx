import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFund() {
  const nav = useNavigate();
  return (
    <div>
      <p className="">there is no page for that address</p>
      <Button
        onClick={() => {
          nav("/", {
            state: "Error not found",
          });
        }}
      >
        Navigate to home
      </Button>
    </div>
  );
}
