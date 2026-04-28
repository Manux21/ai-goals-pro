import { defineComponent } from "vue"
import s from "./AnimatedBackground.module.css"

export const AnimatedBackground = defineComponent({
    name: "AnimatedBackground",
    setup() {
        return () => (
            <div class={s.root} aria-hidden="true">
                <div class={[s.blob, s.leftBlob]} />
                <div class={[s.blob, s.rightBlob]} />
                <div class={[s.blob, s.centerBlob]} />
                <div class={s.grid} />
                <div class={s.grain} />
            </div>
        )
    },
})
