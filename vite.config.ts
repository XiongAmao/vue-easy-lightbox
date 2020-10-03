import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  root: path.resolve(process.cwd(), './example'),
  outDir: path.resolve(process.cwd(), './dist-gh-page')
}

export default config
