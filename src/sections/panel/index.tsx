import styled from '../../themes/styled';
import { Box, Flex, Text } from 'rebass';
import media from 'styled-media-query';

export const WrapperPanel = styled(Flex)`
  margin-right: 16px;
  width: 350px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-top: 16px;
  margin-right: 10px;
  ${media.lessThan('1095px')`
  width: 290px;
`};
  ${media.lessThan('1005px')`
   display: none;
  `};
`;

export const PanelInner = styled(Flex)`
  position: sticky;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
`;

export const Panel = styled(Box)`
  background: #f9f0e8!important
  border-radius: 4px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-bottom: 16px;
`;

export const PanelTitle = styled(Text)`
  text-transform: uppercase;
  border-bottom: 4px solid white;
  padding: 16px;
`;

export const Nav = styled(Box)`
  padding: 16px;
`;

export const NavItem = styled(Text)`
color: ${props => props.theme.styles.colors.darkgray}
a {
  color: ${props => props.theme.styles.colors.darkgray}
  text-decoration: none;
}
  `;