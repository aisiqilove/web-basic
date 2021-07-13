const express = require('express');
const puppeteer = require('puppeteer');


async function test(url) {
    console.log('截图')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {
        waitUtil: 'networkidle2'
    })
    await page.screenshot({
        path: `img/${url}.png`, fullPage: true, width: 1125,
        height: 2000,
    })
    await browser.close()

    // const base64 = await page.screenshot({ encoding: "base64" });
    // await browser.close();
    // res.attachment("screenshot.png");
    // res.send(`<img src="data:image/png;base64,${base64}" />`);
}
const app = express();
app.get('*', async (req, res) => {
    if (req.url == '/favicon.ico') {
        // 对seo无影响
        return res.send({ code: 0 })
    }
    // const url = 'https://m-test.creativecloud.tencent.com/embed-login';
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    console.log(req.url)
    await page.goto('http://localhost:8081' + req.url, {
        waitUtil: 'networkidle2'
    })
    const html = await page.content()
    res.send(html);
})

app.listen(8001, () => {
    console.log('8081 开启 ');
});