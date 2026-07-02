"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useReservationsCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      fetch("/api/reservations/count")
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    };

    refresh();

    const supabase = createClient();
    const channel = supabase
      .channel("reservations-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        refresh
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return count;
}
