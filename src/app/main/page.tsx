import ServerFetcher from "@components/server-fetcher/server-fetcher";

const HomePage = ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) => {
  return <ServerFetcher searchParams={searchParams} />;
};

export default HomePage;
