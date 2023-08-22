interface Props {
  title: string;
  right?: React.ReactNode;
}
export const PageHeader = ({ title, right }: Props) => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <p className="text-3xl">{title}</p>
      {right}
    </div>
  );
};
