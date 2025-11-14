import type { IButtonProps } from '../../../types/types'
import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons'



export const SquareButton = ({onClick, icon=<PlusOutlined />, isTiny, color="cyan", title, ...props} : IButtonProps) => {


  return (
     <Button
          style={{
            maxWidth: isTiny ? "1vw" : undefined,
            maxHeight: isTiny ? "1vw" : undefined,
          }}
          variant='solid'
          color={color}
          icon={icon}
          onClick={onClick}
          type='primary'
          size='small'
          title={title}
          {...props}
          />
  )
}
