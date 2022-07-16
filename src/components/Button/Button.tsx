import { forwardRef, Ref, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

import './Button.css'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button = forwardRef((props: Props, ref?: Ref<HTMLButtonElement>) => {
  const { className, children, ...otherProps } = props

  return (
    <button className="button" ref={ref} {...otherProps}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
