import { Loader } from "lucide-react";

const LoaderSpinner = ({ loaderRef }) => (
  <div ref={loaderRef} className="h-20 flex justify-center items-center">
    <Loader className="w-6 h-6 text-yellow-400 animate-spin" />
  </div>
);

export default LoaderSpinner;
