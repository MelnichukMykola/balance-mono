import { memo } from "react";
import './styles.scss'

export default memo(({ children, classNames, ...rest }) => (
  <button {...rest} className={`${classNames} button`}>
    {children}
  </button>
));
