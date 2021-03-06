import React, { FC } from 'react';
import styled from 'ui/themes/styled';
import Loader from '../Loader';
import { darken, lighten, transitions } from 'polished';
import { Button } from 'rebass/styled-components';
import { ButtonProps } from 'rebass';

const WrapperButton = styled(Button)<{
  variant: string;
  isIcon: boolean;
  disabled: boolean;
}>`
  ${transitions('background, 0.2s')};
  width: ${props => (props.isIcon === true ? '40px' : 'auto')};
  border-radius: ${props => (props.isIcon === true ? '100%' : '4px')};
  padding: ${props => (props.isIcon === true ? '0px' : 'auto')};
  opacity: ${props => (props.disabled === true ? '0.7' : '1')};
  cursor: ${props => (props.disabled === true ? 'default' : 'pointer')};
  &:hover && not:['disabled'] {
    background: ${props =>
      props.variant === 'primary' || props.variant === 'danger'
        ? darken('0.1', props.theme.colors.primary)
        : lighten('0.3', props.theme.colors.primary)};
  }
`;

export interface Props extends ButtonProps {
  isSubmitting?: boolean;
  variant: string;
  isDisabled?: boolean;
  isIcon?: boolean;
}

const MNButton: FC<Props> = props => (
  //@ts-ignore
  <WrapperButton
    {...props}
    isSubmitting={props.isSubmitting}
    disabled={props.isDisabled}
    isIcon={props.isIcon}
    variant={props.variant}
  >
    {props.isSubmitting ? <Loader variant={props.variant} /> : props.children}
  </WrapperButton>
);

export default MNButton;
