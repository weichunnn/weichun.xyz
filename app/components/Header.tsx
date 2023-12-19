export default function Header({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return <h1 className={`text-xl mb-2 font-bold ${className}`}>{title}</h1>;
}
