import { Trans } from '@lingui/macro';
import React from 'react';
import { Box, Flex, Text, Heading } from 'rebass/styled-components';
import { FormikHook } from 'ui/@types/types';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';
import { SimpleLink } from 'ui/helpers/SimpleLink';

export interface Props {
  name: string;
  icon: string;
  summary: string;
  followersCount: number;
  collectionsCount: number;
  threadsCount: number;
  toggleJoinFormik: FormikHook<{}>;
  joined: boolean;
  link: {
    url: string;
    external: boolean;
  };
  displayUsername: string;
  hideActons?: boolean;
}

export const Community: React.FC<Props> = ({
  name,
  icon,
  summary,
  followersCount,
  joined,
  toggleJoinFormik,
  collectionsCount,
  link,
  displayUsername,
  hideActons
}) => (
  <Bordered>
    <Wrapper p={2}>
      <WrapperLink link={link}>
        <WrapperImage>
          <Avatar size="l" src={icon} />
        </WrapperImage>
        <Box p={2}>
          <Flex>
            <Box flex={1}>
              <Title variant="heading" fontSize={3}>
                {name.length > 60
                  ? name.replace(/^(.{56}[^\s]*).*/, '$1...')
                  : name}
              </Title>
              <Username>{displayUsername}</Username>
            </Box>
          </Flex>

          <Text sx={{ height: '60px' }} variant="text" mt={2}>
            {summary.length > 90
              ? summary.replace(/^([\s\S]{86}[^\s]*)[\s\S]*/, '$1...')
              : summary}
          </Text>
        </Box>
      </WrapperLink>
    </Wrapper>
    <Meta my={2}>
      <Flex alignSelf="center" mr={3} alignItems="center">
        <Text variant="suptitle">
          {followersCount || 0} <Trans>Users</Trans>
        </Text>
      </Flex>
      <Flex alignSelf="center" alignItems="center">
        <Text variant="suptitle">
          {collectionsCount || 0} <Trans>Collections</Trans>
        </Text>
      </Flex>
      {hideActons ? null : (
        <ActionItem onClick={toggleJoinFormik.submitForm}>
          <Text ml={2} variant={'suptitle'}>
            {joined ? <Trans>Leave</Trans> : <Trans>Join</Trans>}
          </Text>
        </ActionItem>
      )}
    </Meta>
  </Bordered>
);

const WrapperLink = styled(SimpleLink)`
  text-decoration: none;
`;

// const Items = styled(Flex)`
//   flex: 1;
//   justify-content: space-around;
// `;
// const Items = styled(Flex)`
//   flex: 1;
//   justify-content: space-around;
// `;

// const Actions = styled(Box)`
//   position: relative;
//   z-index: 999999999999999999999999999999999999;
//   border-top: 1px solid #dadada;
//   padding: 8px;
// `;

const ActionItem = styled(Flex)`
  align-items: center;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 9;
  }
  &:hover {
    svg.hover {
      stroke: ${props => props.theme.colors.orange};
    }
  }
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  flex: 1;
`;

const Meta = styled(Flex)`
  color: ${props => props.theme.colors.gray};
  justify-content: space-evenly;
`;

const Bordered = styled(Box)`
  border: 1px solid ${props => props.theme.colors.lightgray};
  border-radius: 4px;
`;

const Wrapper = styled(Box)`
  position: relative;
  max-height: 560px;
  overflow: hidden;
  z-index: 9;
  padding-bottom: 0;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.lighter};
    text-decoration: none;
  }
  &&& a {
    color: inherit;
    text-decoration: none;
    &&&:hover {
      text-decoration: none;
    }
  }
`;

const WrapperImage = styled.div`
  position: relative;
  div {
    width: 100%;
    heigth: 150px;
    background-repeat: no-repeat;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:hover {
    & span {
      display: block;
    }
  }
`;

// const TitleLink = styled(SimpleLink)`
//   text-decoration: none;
//   color: ${props => props.theme.colors.darkgray};
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const Title = styled(Heading)`
  color: ${props => props.theme.colors.darkgray};
  font-size: 20px;
  text-decoration: none;
  word-break: break-all;
`;