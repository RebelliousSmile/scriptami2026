/**
 * Génère des thumbnails pour les projets à partir de leurs URLs.
 * Usage : node scripts/capture-thumbnails.mjs [slug1 slug2 ...]
 * Sans argument : capture tous les projets sans image existante.
 * Projets sans URL publique (#) : télécharge une image placeholder libre de droits.
 */

import { chromium } from 'playwright'
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createWriteStream } from 'fs'
import https from 'https'

const CONTENT_DIR = './content/en/projects'
const OUT_DIR = './public/projects'
const VIEWPORT = { width: 1280, height: 800 }
const TIMEOUT = 15000

// Image placeholder libre de droits pour les projets sans URL publique
// Unsplash Source — tech/code themed
const PLACEHOLDER_IMAGES = {
  default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=800&fit=crop&q=80',
}

function loadProjects() {
  return readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf8'))
      return { slug: f.replace('.json', ''), ...data }
    })
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        downloadImage(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function captureUrl(page, slug, url) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: TIMEOUT })
    await page.waitForTimeout(2000)
    const outPath = join(OUT_DIR, `${slug}.jpg`)
    await page.screenshot({ path: outPath, fullPage: false, type: 'jpeg', quality: 85 })
    console.log(`✓ ${slug} (screenshot)`)
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message.split('\n')[0]}`)
  }
}

async function capturePlaceholder(slug) {
  try {
    const outPath = join(OUT_DIR, `${slug}.webp`)
    const placeholderUrl = PLACEHOLDER_IMAGES[slug] || PLACEHOLDER_IMAGES.default
    await downloadImage(placeholderUrl, outPath)
    console.log(`✓ ${slug} (placeholder)`)
  } catch (e) {
    console.log(`✗ ${slug} (placeholder): ${e.message}`)
  }
}

function hasExistingImage(slug) {
  return existsSync(join(OUT_DIR, `${slug}.jpg`)) || existsSync(join(OUT_DIR, `${slug}.webp`))
}

const args = process.argv.slice(2)
const projects = loadProjects()

const targets = args.length > 0
  ? projects.filter(p => args.includes(p.slug))
  : projects.filter(p => !hasExistingImage(p.slug))

if (targets.length === 0) {
  console.log('Aucun projet à capturer.')
  process.exit(0)
}

console.log(`Capture de ${targets.length} projet(s)...`)

const browser = await chromium.launch()

for (const project of targets) {
  if (!project.link || project.link === '#') {
    await capturePlaceholder(project.slug)
  } else {
    const page = await browser.newPage()
    await page.setViewportSize(VIEWPORT)
    await captureUrl(page, project.slug, project.link)
    await page.close()
  }
}

await browser.close()
