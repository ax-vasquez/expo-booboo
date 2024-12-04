import { DrawerHeaderContext } from '@/constants/context'
import React, { PropsWithChildren, useState } from 'react'

export const DrawerHeaderProvider: React.FC<PropsWithChildren> = ({
    children
}) => {

    const [button, setButton] = useState<React.JSX.Element | null>(null)
    const [title, setTitle] = useState<string | null>(null)

    return (
        <DrawerHeaderContext.Provider value={{
            title,
            setTitle,
            button,
            setButton
        }}>
            {children}
        </DrawerHeaderContext.Provider>
    )
}
