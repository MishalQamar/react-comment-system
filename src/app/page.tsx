import Navbar from '@/components/navbar';
import { getAuth } from '@/features/auth/actions/get-auth';

const HomePage = async () => {
  const { user } = await getAuth();
  return (
    <>
      <Navbar user={user} />

      <div className="flex flex-col  px-4 bg-gray-100 pt-20 min-h-screen ">
        <h1 className="text-4xl font-bold mb-4 ">
          Reusable Comment System with React and Next.js
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl ">
          A flexible, drop-in comment system built using React Server
          Components and Next.js. It supports polymorphic
          relationships, enabling comments and threaded replies to be
          attached to any model across the app. Includes functionality
          for editing, deleting, and loading nested replies
          efficiently. Designed as a reusable module that can be
          plugged into any page with minimal setup.
        </p>
      </div>
    </>
  );
};
export default HomePage;
