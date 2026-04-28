import { defineComponent, type PropType } from "vue"
import type { ITabsProps, TTabOption } from "./Tabs.types"
import s from "./Tabs.module.css"

export const Tabs = defineComponent({
	name: "Tabs",
	props: {
		items: {
			type: Array as PropType<TTabOption[]>,
			required: true,
		},
		activeId: {
			type: String,
			required: true,
		},
	},
	emits: {
		select: (id: string) => Boolean(id),
	},
	setup(props: ITabsProps, { emit }) {
		return () => (
			<div class={s.tabs} role="tablist">
				{props.items.map((item) => {
					const classes = [s.tab]

					if (item.id === props.activeId) {
						classes.push(s.tabActive)
					}

					return (
						<button
							key={item.id}
							type="button"
							class={classes}
							role="tab"
							aria-selected={item.id === props.activeId}
							onClick={() => {
								emit("select", item.id)
							}}
						>
							{item.label}
						</button>
					)
				})}
			</div>
		)
	},
})
