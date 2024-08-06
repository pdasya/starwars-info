import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/main",
      permanent: false,
    },
  };
};

const Home = () => {
  return null;
};

export default Home;
