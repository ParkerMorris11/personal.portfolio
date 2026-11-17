import { useEffect, useState, type ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SkipLink from "./SkipLink";

const STORAGE_KEY = "pm-scanlines";

type SiteShellProps = {
  children: ReactNode;
};

const SiteShell = ({ children }: SiteShellProps) => {
  const [scanlines, setScanlines] = useState(false);

  useEffect(() => {
    setScanlines(window.localStorage.getItem(STORAGE_KEY) === "on");
  }, []);

  const onToggleScanlines = () => {
    setScanlines((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  };

  return (
    <div className={scanlines ? "site scanlines" : "site"}>
      <SkipLink />
      <SiteHeader scanlines={scanlines} onToggleScanlines={onToggleScanlines} />
      {children}
    </div>
  );
};

export default SiteShell;
