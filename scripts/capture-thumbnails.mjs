/**
 * Génère des thumbnails pour les projets à partir de leurs URLs.
 * Usage : node scripts/capture-thumbnails.mjs [slug1 slug2 ...]
 * Sans argument : capture tous les projets sans image existante.
 */

import { chromium } from 'playwright'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = './content/en/projects'
const OUT_DIR = './public/projects'
const VIEWPORT = { width: 1280, height: 800 }
const TIMEOUT = 15000

// Charge tous les projets depuis les JSON
function loadProjects() {
  return readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf8'))
      return { slug: f.replace('.json', ''), ...data }
    })
    .filter(p => p.link && p.link !== '#')
}

async function capture(page, slug, url) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: TIMEOUT })
    await page.waitForTimeout(2000)
    const outPath = join(OUT_DIR, `${slug}.jpg`)
    await page.screenshot({ path: outPath, fullPage: false })
    console.log(`✓ ${slug}`)
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message.split('\n')[0]}`)
  }
}

const args = process.argv.slice(2)
const projects = loadProjects()

const targets = args.length > 0
  ? projects.filter(p => args.includes(p.slug))
  : projects.filter(p => !existsSync(join(OUT_DIR, `${p.slug}.jpg`)) && !existsSync(join(OUT_DIR, `${p.slug}.webp`)))

if (targets.length === 0) {
  console.log('Aucun projet à capturer.')
  process.exit(0)
}

console.log(`Capture de ${targets.length} projet(s)...`)

const browser = await chromium.launch()
for (const { slug, link } of targets) {
  const page = await browser.newPage()
  await page.setViewportSize(VIEWPORT)
  await capture(page, slug, link)
  await page.close()
}
await browser.close()
