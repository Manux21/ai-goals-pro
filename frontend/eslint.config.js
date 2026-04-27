import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				extraFileExtensions: [".vue"],
			},
			globals: {
				defineProps: "readonly",
				defineEmits: "readonly",
				defineExpose: "readonly",
				withDefaults: "readonly",
			},
		},
		rules: {
			"vue/multi-word-component-names": "off",
		},
	},
)
