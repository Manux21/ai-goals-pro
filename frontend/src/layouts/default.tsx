import { defineComponent } from "vue"
import s from "./default.module.css"

export const DefaultLayout = defineComponent({
	name: "DefaultLayout",
	setup(_, { slots }) {
		return () => <div class={s.layout}>{slots.default?.()}</div>
	},
})
