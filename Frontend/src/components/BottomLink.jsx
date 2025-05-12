
import { Link } from "react-router-dom"; // if using React Router

export const BottomLink = ({ label, linkText, linkHref }) => {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {label}{" "}
      <Link to={linkHref} className="text-black underline">
        {linkText}
      </Link>
    </p>
  );
};
