import React from 'react'
import { Button, ButtonProps, Icon, SemanticCOLORS } from 'semantic-ui-react'

export type AccountButtonProps = {
  label: string
  type: 'button' | 'submit' | 'reset'
  active?: boolean
  disabled?: boolean
  loading?: boolean
  isCompleted?: boolean
  isError?: boolean
  className?: string
  color?: SemanticCOLORS
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void
}

const AccountButton = ({
  label,
  type,
  active,
  disabled,
  loading,
  isCompleted,
  isError,
  color = 'teal',
  className,
  onClick,
}: AccountButtonProps) => {
  if (isError)
    return (
      <Button
        type={type}
        active={active}
        className={className}
        color='red'
        onClick={onClick}
      >
        <Icon name='cancel' />
        {'送信失敗...'}
      </Button>
    )

  return (
    <Button
      loading={loading}
      type={type}
      active={active}
      disabled={disabled}
      className={className}
      color={color}
      onClick={onClick}
    >
      {isCompleted && <Icon name='check' />}
      {label}
      {isCompleted && '完了!'}
    </Button>
  )
}

export default AccountButton
