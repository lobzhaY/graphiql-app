import { PopUpPropsType } from '../../types/popUpInterface';

import './PopUp.scss';

function PopUp({ children, setActive }: PopUpPropsType) {
  function closePopUp() {
    setActive(false);
  }
  return (
    <div className="pop-up" onClick={closePopUp} aria-hidden="true">
      <div className="pop-up-container" onClick={(e) => e.stopPropagation()} aria-hidden="true">
        <div className="pop-up-content">{children}</div>
      </div>
    </div>
  );
}

export default PopUp;
