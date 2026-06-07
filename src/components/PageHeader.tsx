type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="mb-9">
      <h1 className="text-4xl font-black text-[var(--color-accent)] mt-1 mb-2">
        {title}
      </h1>
      <div className="h-px mt-5 bg-gradient-to-r from-[var(--color-purple)] to-transparent" />
    </div>
  );
};

export default PageHeader;