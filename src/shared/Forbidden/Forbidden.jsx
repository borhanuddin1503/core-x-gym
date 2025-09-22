import { Link } from "react-router";

const ForbiddenAccess = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-base-100 p-6">
      <div className="max-w-lg text-center">
        

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-main mb-4">
          403 - Forbidden
        </h1>

        {/* Sub Text */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! You don’t have permission to access this page. <br />
          Please contact the administrator if you think this is a mistake.
        </p>

        {/* Back Button */}
        <Link to="/" className="btn bg-main border-none text-black font-semibold hover:brightness-110 shadow-lg">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenAccess;
