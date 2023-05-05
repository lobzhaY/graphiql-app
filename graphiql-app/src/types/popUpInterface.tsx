import { Dispatch, ReactFragment, ReactPortal, SetStateAction } from 'react';

export type PopUpPropsType = {
  children: JSX.Element | ReactFragment | ReactPortal | boolean | null | undefined;
  active: true;
  setActive: Dispatch<SetStateAction<boolean>>;
};
