import React, { createContext } from "react"

export const DrawerHeaderContext = createContext({ 
    title: null as string | null,
    setTitle: (s: string | null) => {},
    button: null as React.JSX.Element | null,
    setButton: (btn: React.JSX.Element | null) => {},
})
