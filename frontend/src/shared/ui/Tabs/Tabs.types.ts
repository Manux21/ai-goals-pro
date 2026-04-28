export type TTabOption = {
	id: string
	label: string
}

export interface ITabsProps {
	items: TTabOption[]
	activeId: string
}
