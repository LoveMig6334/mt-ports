export default function Footer() {
  return (
    <footer
      className="flex justify-between px-12 py-8 text-[0.65rem] tracking-[0.05em] max-[900px]:px-6 max-[900px]:flex-col max-[900px]:gap-2 max-[900px]:text-center"
      style={{
        borderTop: "1px solid rgba(240,236,228,0.08)",
        color: "rgba(240,236,228,0.25)",
        fontFamily: "var(--font-body)",
      }}
    >
      <span>&copy; 2026 NOVA. All rights reserved.</span>
      <span>Designed with intention.</span>
    </footer>
  );
}
