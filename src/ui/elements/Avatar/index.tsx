import * as React from 'react';
import styled from '../../themes/styled';
import { Box } from 'rebass/styled-components';

const Wrapper = styled(Box)<{ bg?: string; size?: string }>`
  font-family: ${props => props.theme.fontFamily};
  border-radius: 4px;
  width: ${props =>
    props.size === 'm' ? '140px' : props.size === 'l' ? '200px' : '48px'};
  height: ${props =>
    props.size === 'm' ? '140px' : props.size === 'l' ? '200px' : '48px'};
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  background-color: ${props => props.theme.colors.lighter};
  span {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: normal;
    font-weight: 700;
    ${props => props.theme.colors.darkgray};
  }
`;
const Avatar: React.FC<{
  src?: string;
  initials?: string;
  variant?: string;
  size?: string;
}> = ({ size, src, initials, variant }) => (
  <Wrapper size={size} bg={src} variant={variant}>
    {initials && !src ? <span>{initials}</span> : null}
  </Wrapper>
);

export default Avatar;
