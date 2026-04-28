import { defineComponent } from "vue"
import { useAppRoute } from "~/app/router"
import HomePage from "~/pages/index"
import DebugPage from "~/pages/debug"
import { DefaultLayout } from "~/layouts/default"

export default defineComponent({
	name: "App",
	setup() {
		const route = useAppRoute()

		return () => {
			if (route.value.id === "debug") {
				return (
					<DefaultLayout>
						<DebugPage />
					</DefaultLayout>
				)
			}

			return <HomePage />
		}
	},
})
