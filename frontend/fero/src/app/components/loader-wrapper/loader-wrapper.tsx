import LoaderComponent from "../loader/loader";

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {children}
    </div>
  );
};

export default LoaderWrapper;
