import React, { FunctionComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = () => {
  return <header>HACKER NEWS: Who is hiring?</header>;
};

export default Header;
