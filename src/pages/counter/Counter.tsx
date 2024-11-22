import IntervalComponent from "@/components/IntervalComponent";

type Props = {};

export default function Counter({}: Props) {
  return (
    <div className="flex gap-2 p-2">
      <IntervalComponent
        title="Counter one"
        items={[
          { title: "one-one", time: 10 },
          { title: "one-two", time: 20 },
        ]}
      />
      <IntervalComponent
        title="Counter two"
        items={[
          { title: "two-one", time: 10 },
          { title: "two-two", time: 25 },
        ]}
      />
    </div>
  );
}
