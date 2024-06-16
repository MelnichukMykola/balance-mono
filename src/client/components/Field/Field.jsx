import cn from 'classnames'
import { memo } from 'react'
import './styles.scss'

export default memo(
  ({ register, name, error = false, helperText = '', ...rest }) => {
    return (
      <div className={cn('inputField', error && 'inputField__error')}>
        <input {...register(name)} {...rest} />
        {error && <p className='error'>{helperText}</p>}
      </div>
    )
  }
)
