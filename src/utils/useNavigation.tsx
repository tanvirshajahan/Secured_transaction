import { useContext } from "react";
import { NavigationContext, NavigationParams, NavigationRoute, NavigationScreenProp } from "react-navigation";



export function useNavigation(){
    return useContext(NavigationContext) as NavigationScreenProp<NavigationRoute,NavigationParams>
}