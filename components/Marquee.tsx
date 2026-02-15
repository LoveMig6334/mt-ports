"use client";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

export default function Marquee({ items, direction = "left", speed = 25 }: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i}>
      {item}{" "}
      <span
        className="inline-block w-2 h-2 rounded-full mx-8 align-middle"
        style={{ backgroundColor: "var(--accent)" }}
      />
    </span>
  ));

  return (
    <div
      className="py-8 overflow-hidden"
      style={{ borderTop: "1px solid rgba(240,236,228,0.08)", borderBottom: "1px solid rgba(240,236,228,0.08)" }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `${direction === "left" ? "marquee" : "marquee-reverse"} ${speed}s linear infinite`,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "rgba(240,236,228,0.12)",
        }}
      >
        <span className="flex items-center whitespace-nowrap px-8">
          {content}
        </span>
        <span className="flex items-center whitespace-nowrap px-8">
          {content}
        </span>
      </div>
    </div>
  );
}
