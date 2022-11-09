import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/cla7q578i1eud01uq4weybdlt/master'
);

export async function getStaticProps({ params }) {
  const { aslam } = await hygraph.request(
    `
    query AslamPageQuery($slug: String!) {
      aslam(where: { slug: $slug }) {
        title
        artista
        slug
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      aslam,
    },
  };
}

export async function getStaticPaths() {
  const { aslams } = await hygraph.request(`
    {
      aslams {
        slug
        title
        artista
      }
    }
  `);

  return {
    paths: aslams.map(({ aslam: slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  };
}

export default ({ aslam }) => (
  <React.Fragment>
    <h1>{aslam.title}</h1>
    <p>{aslam.artista}</p>
  </React.Fragment>
);