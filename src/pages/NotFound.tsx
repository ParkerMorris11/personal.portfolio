import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: no page for", location.pathname);
  }, [location.pathname]);

  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <p>That URL is not part of this site.</p>
      <a href="/">Return home</a>
    </main>
  );
};

export default NotFound;
