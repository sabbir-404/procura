import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const routes = [
  { name: '1. Procurement Dashboard', path: '/dashboard' },
  { name: '2. Requisitions Management', path: '/requisitions' },
  { name: '3. Create Requisition', path: '/requisitions/create' },
  { name: '4. Supplier Management', path: '/suppliers' },
  { name: '5. Quotations & AI Comparison', path: '/quotations' },
  { name: '6. Purchase Orders', path: '/purchase-orders' },
  { name: '7. Approval Center', path: '/approvals' },
  { name: '8. Procurement Analytics', path: '/analytics' },
];

async function generatePDF() {
  console.log('====================================================');
  console.log(' Procura — High-Fidelity Design PDF Generator');
  console.log('====================================================\n');

  // 1. Start internal Vite server
  console.log('Starting internal Vite server on port 5173...');
  const server = await createServer({
    root: projectRoot,
    server: {
      port: 5173,
      host: '127.0.0.1'
    }
  });
  await server.listen();
  console.log('Vite server running at http://127.0.0.1:5173\n');

  // 2. Launch Playwright
  console.log('Launching headless Chromium browser (1600x900 viewport)...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2 // High DPI crisp rendering
  });

  const page = await context.newPage();

  // 3. Create PDF Document
  const pdfDoc = await PDFDocument.create();
  const tempDir = path.join(projectRoot, '.temp_captures');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // 4. Capture each route
  console.log(`Capturing ${routes.length} application screens in 16:9 ratio:\n`);

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const targetUrl = `http://127.0.0.1:5173${route.path}`;
    console.log(`[${i + 1}/${routes.length}] Navigating to: ${route.name} (${route.path})`);

    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Ensure all fonts and visual styles are loaded
    await page.evaluate(() => document.fonts.ready);

    // Allow Recharts SVG animations and layout to settle
    await page.waitForTimeout(2000);

    // Capture screenshot at 1600x900
    const screenshotBuffer = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    console.log(`  ✓ Captured screen (${screenshotBuffer.length} bytes)`);

    // Embed into PDF page (1600 x 900 points)
    const pngImage = await pdfDoc.embedPng(screenshotBuffer);
    const pdfPage = pdfDoc.addPage([1600, 900]);

    pdfPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: 1600,
      height: 900
    });
  }

  // 5. Save the combined PDF
  const outputFileName = 'Procura_High_Fidelity_Design.pdf';
  const outputPath = path.join(projectRoot, outputFileName);
  console.log(`\nWriting combined 16:9 PDF with ${pdfDoc.getPageCount()} pages...`);
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`\n✓ SUCCESS! High-fidelity design PDF created:`);
  console.log(`  File: ${outputPath}`);
  console.log(`  Total Pages: ${pdfDoc.getPageCount()}`);
  console.log(`  Aspect Ratio: 16:9 (1600 x 900 Landscape)\n`);

  // Cleanup
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  await browser.close();
  await server.close();

  process.exit(0);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

