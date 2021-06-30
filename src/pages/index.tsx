import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Container } from '../styles/Main';
import { GitInfoContext } from './context/UserInfoContext';

interface Props {
  users: IUsers[];
}

const Home: React.FC<Props> = ({ users }) => {
  const context = useContext(GitInfoContext);

  useEffect(() => context?.handleGitCall('microsoft'), []);

  return (
    <div>
      <Head>
        <title>Next-Type</title>
        <meta
          name="description"
          content="Nextjs and typescript app (Test)"
          key="title"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>{context?.gitInfo?.name}</h1>
        <p>{context?.gitInfo?.id}</p>
        <p>{context?.gitInfo?.description}</p>
        <hr />
        <br />
        <h1>Github user list test</h1>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.login}`}>
                <a>{user.login}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/microsoft/members');
  const users = await response.json();

  return {
    props: { users },
  };
};

export default Home;
