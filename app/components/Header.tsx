export default function Header({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return <h1 className={`text-2xl mb-6 font-bold ${className}`}>{title}</h1>;
}
