import { useLazyCheckTokenQuery } from "@/lib/redux/features/auth/authApi";
import { useState, useEffect, useRef, useCallback } from "react";

type Props = {
  title?: string;
  items: { title: string; time: number }[];
};

export default function IntervalComponent({ title, items }: Props) {
  return (
    <div
      dir="ltr"
      className="size-72 flex flex-col gap-2 border rounded-sm shadow p-4"
    >
      <p>{title ?? ""}</p>
      {items.map((item) => (
        <RequestOnTimeOut countDown={item.time} title={item.title} />
      ))}
    </div>
  );
}

const RequestOnTimeOut = ({
  countDown,
  title,
}: {
  countDown: number;
  title: string;
}) => {
  const [get, { isLoading, data }] = useLazyCheckTokenQuery({});

  const runQuery = useCallback(() => {
    get({ success: `${title}-${countDown}` });
  }, []);

  return (
    <div dir="ltr" className=" border rounded-sm shadow p-4">
      <CountDownTimer countDown={countDown} callBack={runQuery} />
      {data && JSON.stringify(data)}
      {isLoading && "در حال بارگذاری"}
    </div>
  );
};

export const CountDownTimer = ({
  countDown,
  callBack,
}: {
  countDown: number;
  callBack?: () => void;
}) => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(countDown);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval.current!); // Stop the timer
          callBack?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [countDown, callBack]);

  return <p>{time}</p>;
};
