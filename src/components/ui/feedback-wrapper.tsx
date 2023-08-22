import { Loader, XCircleIcon } from "lucide-react";

interface Props {
  error: any | null;
  loading: boolean;
  children: React.ReactNode;
}
export const FeedbackWrapper = ({ children, error, loading }: Props) => {
  if (loading) {
    return (
      <div className="mt-10 h-52 flex justify-center items-center">
        <Loader className=" h-10 w-10 animate-spin mx-auto " />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center mt-10">
        <XCircleIcon size={32} />
        <p> Something went wrong </p>
      </div>
    );
  }
  return children;
};
