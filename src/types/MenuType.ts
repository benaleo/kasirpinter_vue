export type MenuType = {
    group: string,
    items: {
        title: string,
        url: string,
        component: any,
        icon: any
    }[]
}