import Main from "@components/main/Main";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, page } = context.query;
  const searchQuery = search?.toString() || "";
  const pageQuery = Number(page) || 1;

  const fetchCharacters = async (searchItem: string, page: number) => {
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${searchItem}&page=${page}`,
    );
    return res.json();
  };

  const data = await fetchCharacters(searchQuery, pageQuery);

  return {
    props: {
      initialData: data,
      initialSearchQuery: searchQuery,
      initialPageQuery: pageQuery,
    },
  };
};

export default Main;
