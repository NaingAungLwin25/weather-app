import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-300 via-blue-300 to-blue-500 min-h-screen">
      <div className="flex flex-col items-center justify-center w-screen  text-gray-700 p-10">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
