import ts from 'typescript-eslint'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  {
    ignores: [
      '**/*.js',
      '**/.*',
      '**/db/src/client.ts',
      '**/env.ts',
      '**/tailwind/web.ts',
      '**/trpc/react.tsx'
    ]
  },
  ...ts.configs.stylistic,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
        config: './tooling/tailwind/web.ts',
        whitelist: ['toaster', 'notranslate']
      }
    }
  }
]
