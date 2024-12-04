import { router, useNavigation } from 'expo-router'
import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import List from '../assets/icons/bootstrap/bootstrap-list.svg'
import BackArrow from '../assets/icons/bootstrap/bootstrap-arrow-90deg-left.svg'
import { useDrawerHeader } from '@/hooks/useDrawerHeader'
import { CustomHeaderStyles } from '@/styles/components'
import { BRAND_COLOR_SECONDARY } from '@/styles/root'

interface CustomHeaderProps {
    title: string | string[],
    isRootPage: boolean,
}

/**
 * Application header to replace the built-in header.
 * 
 * This allows us to modify the header content much more easily than the built-in one.
 * 
 * @param param0 
 * @returns 
 */
export const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    isRootPage
}) => {
    const iconSize = 28
    const nav = useNavigation()
    const drawerHeader = useDrawerHeader()

    const Icon = () => {
        if (isRootPage) {
            return <List height={iconSize} width={iconSize} color={BRAND_COLOR_SECONDARY} />
        }
        return <BackArrow height={iconSize} width={iconSize} color={BRAND_COLOR_SECONDARY} />
    }

    return (
        <View style={CustomHeaderStyles.container}
        >
            <Pressable 
                style={[
                    CustomHeaderStyles.button,
                    CustomHeaderStyles.left
                ]}
                onTouchEnd={() => {
                    if (isRootPage) {
                        return nav.dispatch(DrawerActions.toggleDrawer())
                    } else {
                        return router.back()
                    }
                }}
            >
                    <Icon />
            </Pressable>
            <View 
                style={CustomHeaderStyles.titleContainer}
            >
                <Text style={CustomHeaderStyles.titleText}>{drawerHeader.title ? drawerHeader.title : title}</Text>
            </View>
            {drawerHeader.button}
        </View>
    )
}
