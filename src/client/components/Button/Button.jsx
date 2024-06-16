import { memo } from "react";
import './styles.scss'

export default memo(({ children, ...rest }) => (
  <button {...rest} className='button'>
    {children}
  </button>
));
