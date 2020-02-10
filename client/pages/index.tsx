import { NextPage } from 'next';
import styled from 'styled-components';
import LinkList from '../components/LinkList';

const Title = styled.h1`
  font-size: 50px;
`;

function Home(): NextPage {
  return (
    <div>
      <Title>My page</Title>
      <LinkList />
    </div>
  );
}

export default Home;
