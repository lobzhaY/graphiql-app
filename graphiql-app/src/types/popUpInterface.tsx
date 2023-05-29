import { Dispatch, ReactFragment, ReactNode, ReactPortal, SetStateAction } from 'react';

export type PopUpPropsType = {
  children: JSX.Element | ReactFragment | ReactPortal | boolean | null | undefined | ReactNode;
  active: true;
  setActive: Dispatch<SetStateAction<boolean>>;
};
