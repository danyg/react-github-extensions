import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <>
      <h1> {location.pathname} Not Found </h1>
      <br />
      <Link to="/">Go back to home</Link>
    </>
  );
}
