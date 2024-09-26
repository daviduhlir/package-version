#!/usr/bin/env node
import { PromptText, PromptSelect, Args, ArgOptionType, Exec } from '@david.uhlir/terminal-ui'
import * as path from 'path'
import { promises as fs } from 'fs'

const args = Args.parse({
  version: {
    short: 'v',
    long: 'version',
    type: ArgOptionType.String,
    description: 'Type of version incrementation, or custom version',
  },
})

async function promptVersion() {
  let version
  const options = [
    { value: 'prerelease', text: 'Prerelease' },
    { value: 'prepatch', text: 'Prepatch' },
    { value: 'preminor', text: 'Preminor' },
    { value: 'premajor', text: 'Premajor' },
    { value: 'patch', text: 'Patch (\x1b[33mDefault\x1b[0m)' },
    { value: 'minor', text: 'Minor' },
    { value: 'major', text: 'Major' },
    { value: 'custom', text: 'Custom' },
  ]
  version = await PromptSelect.prompt('Please select version:', options, ['patch'])
  if (version === 'custom') {
    version = await PromptText.prompt('Enter custom version:', /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})(-([0-9A-Za-z-_.]{1,}))?$/)
  }
  return version
}

function error(text: string) {
  console.error('Error', text)
  process.exit()
}

async function readPackage() {
  let level = 0
  let packageJson
  for(;level < 10; level++) {
    try {
      packageJson = JSON.parse(await fs.readFile(path.resolve(new Array(level).join('../'), './package.json'), 'utf-8'))
    } catch (e) {}
  }
  if (!packageJson) {
    error('Can not read package.json')
  }
  return packageJson
}

;(async function () {
  try {
    const packageJson = await readPackage()
    console.log(`Package ${packageJson.name} Current version ${packageJson.version}`)
    const version = args.version ? args.version : await promptVersion()
    await Exec.cmd('npm', 'version', version)
    console.log('New version:', (await readPackage()).version)
    process.exit()
  } catch (e) {
    error(`Failed to change version: ${e.message}`)
  }
})()
