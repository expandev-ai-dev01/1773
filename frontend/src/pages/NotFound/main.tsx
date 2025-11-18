import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
