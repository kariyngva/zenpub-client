import React from 'react';
import styled from '../../../themes/styled';
import { Preferites } from '../Icons';
import { compose } from 'recompose';
import { graphql, OperationOption } from 'react-apollo';
const {
  joinCommunityMutation
} = require('../../../graphql/joinCommunity.graphql');
const { getCommunity } = require('../../../graphql/getCommunity.graphql');
const {
  undoJoinCommunityMutation
} = require('../../../graphql/undoJoinCommunity.graphql');
import { Trans } from '@lingui/macro';

interface Props {
  joinCommunity: any;
  leaveCommunity: any;
  id: string;
  followed: boolean;
}

const withJoinCommunity = graphql<{}>(joinCommunityMutation, {
  name: 'joinCommunity'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const withLeaveCommunity = graphql<{}>(undoJoinCommunityMutation, {
  name: 'leaveCommunity'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const Join: React.SFC<Props> = ({
  joinCommunity,
  id,
  leaveCommunity,
  followed
}) => {
  if (followed) {
    return (
      <Span
        onClick={() =>
          leaveCommunity({
            variables: { communityId: id },
            update: (proxy, { data: { leaveCommunity } }) => {
              console.log(leaveCommunity);
              const data = proxy.readQuery({
                query: getCommunity,
                variables: {
                  context: parseInt(id)
                }
              });
              data.community.followed = leaveCommunity;
              proxy.writeQuery({
                query: getCommunity,
                variables: {
                  context: parseInt(id)
                },
                data
              });
            }
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err))
        }
      >
        <Trans>Leave</Trans>
      </Span>
    );
  } else {
    return (
      <Span
        onClick={() =>
          joinCommunity({
            variables: { communityId: id },
            update: (proxy, { data: { leaveCommunity } }) => {
              console.log(leaveCommunity);
              const data = proxy.readQuery({
                query: getCommunity,
                variables: {
                  context: id
                }
              });
              data.community.followed = leaveCommunity;
              proxy.writeQuery({
                query: getCommunity,
                variables: {
                  context: id
                },
                data
              });
            }
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err))
        }
      >
        <Preferites
          width={16}
          height={16}
          strokeWidth={2}
          color={'#1e1f2480'}
        />
        <Trans>Join</Trans>
      </Span>
    );
  }
};

const Span = styled.div`
  padding: 0px 10px;
  color: #1e1f2480;
  height: 40px;
  font-weight: 600;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: ${props => props.theme.styles.colour.primaryAlt};
    & svg {
      color: ${props => props.theme.styles.colour.primaryAlt};
    }
  }
  & svg {
    margin-right: 8px;
    vertical-align: sub;
  }
`;

export default compose(
  withJoinCommunity,
  withLeaveCommunity
)(Join);
