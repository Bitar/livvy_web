import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

const PendingIcon: React.FC<Props> = ({className}) => {
  return <i className={clsx('bi fs-3 text-secondary', 'bi-hourglass-split', className)}></i>
}

export default PendingIcon
