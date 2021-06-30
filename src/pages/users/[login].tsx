import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Container } from '../../styles/User';

import { GitInfoContext } from '../context/UserInfoContext';

interface User {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
}

interface Props {
  user: User;
}

const User: React.FC<Props> = ({ user }) => {
  const context = useContext(GitInfoContext);
  return (
    <Container>
      <h1>{context?.gitInfo?.name}</h1>
      <p>{context?.gitInfo?.id}</p>
      <p>{context?.gitInfo?.description}</p>
      <br />
      <Image src={user.avatar_url} alt="Profile" width={140} height={140} />

      <h1>{user.name}</h1>
      <p>ID: {user.id}</p>
      <p>Login: {user.login}</p>
      <p>BIO: {user?.bio || '-'}</p>

      <br />
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Container>
  );
};

export default User;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.github.com/users/${params?.login}`);
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.github.com/orgs/microsoft/members');
  const users = await res.json();

  const paths = users.map((user: User) => {
    return {
      params: {
        login: user.login,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
