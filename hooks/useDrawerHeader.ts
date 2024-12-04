import { DrawerHeaderContext } from "@/constants/context"
import { useContext } from "react"

/** 
 * Convenience wrapper to obtain DrawerHeaderContext w/o needing to call useContext directly (simpler call structure)
 * 
 * NOTE: All component that consume this context will re-render when the context changes (the same is true if you called useContext directly - 
 * it's just how it works)
 */
export const useDrawerHeader = () => {
    return useContext(DrawerHeaderContext)
}
